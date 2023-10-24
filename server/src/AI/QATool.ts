import { OpenAI } from "langchain/llms/openai";
import {
  AgentExecutor,
  initializeAgentExecutorWithOptions,
} from "langchain/agents";
import { ChainTool } from "langchain/tools";
import { VectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import { BuildMessageType } from "./QA";
import { AIMessage, BaseMessage, HumanMessage } from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import dotenv from "dotenv";
dotenv.config();

export class QATool {
  private executor: AgentExecutor;

  private constructor(executor: AgentExecutor) {
    this.executor = executor;
  }

  public static build = async (messages: BuildMessageType) => {
    const model = new OpenAI({ temperature: 0 });
    const aboutText = fs.readFileSync("about.txt", "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([aboutText]);
    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings()
    );
    ///
    const previousMessages: BaseMessage[] = [];

    messages.forEach(async (msg) => {
      let tempMessage: BaseMessage;
      if (msg.isAI) tempMessage = new AIMessage({ content: msg.message });
      else tempMessage = new HumanMessage({ content: msg.message });
      previousMessages.push(tempMessage);
    });

    const chatHistory: ChatMessageHistory = new ChatMessageHistory(
      previousMessages
    );

    ///
    const bufferMemory = new BufferMemory({
      chatHistory: chatHistory,
      memoryKey: "chat_history",
    });
    ///
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, bufferMemory);
    const qaTool = new ChainTool({
      name: "about the company",
      description: "Answer in Persian",
      chain: chain,
    });
    const tools = [qaTool];
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "zero-shot-react-description",
    });
    return new QATool(executor);
  };

  public ask = async (question: string) => {
    return await this.executor.call({ question });
  };
}
