# Langchain, Pinecone, and GPT with Next.js - Full Stack Starter

This is a basic starter project for building with the following tools and APIs:

- Next.js
- LangchainJS
- Pineceone Vector Database
- GPT3

### What we're building

This is an app that takes text (text files), embeds them into vectors, stores them into a vector database (Pinecone), and allows for semantic searching of the data.

## Running the app

How to deploy and run this app:

### Prerequisites

This app requires the following:

1. An [OpenAI](https://platform.openai.com/) API key
2. [Pinecone](https://app.pinecone.io/) API Key

### Up and running

To run the app locally, follow these steps:

1. Clone this repo

```sh
git clone git@github.com:geisera/ai-handbook.git
```

2. CD into the directory and install the dependencies using either NPM or Yarn

```sh
npm install
```

3. Copy `.example.env.local` to a new file called `.env.local` and update with your API keys and environment.

    __Be sure your environment is an actual environment given to you by Pinecone, like `gcp-starter`__

4. (Optional) - Add your own custom text or markdown files into the `/documents` folder. Currently, this app will search our employee handbook.

5. Run the app:

```sh
npm run dev
```

### Need to know

When creating the embeddings and the index, it can several minutes for the index to initialize. There is a settimeout function of 180 seconds in the `utils` that waits for the index to be created.

If the initialization takes longer, it will fail when you try to create the embeddings. If this happens, visit [the Pinecone console](https://app.pinecone.io/) to watch and wait for the status of your index being created to finish, then run the function again.

### Running a query

__The pre-configured app data is about the M&S Salaried Employee Handbook, so it will only understand related questions to that document unless you replace it with your own data. Here are a couple of questions you might ask it with the default data__

1. What is M&S?
2. When was M&S founded?
3. Are alligators allowed at work?

> This project was forked from [this repository](https://github.com/dabit3/semantic-search-nextjs-pinecone-langchain-chatgpt).

> The base of that project was guided by [this Node.js tutorial](https://www.youtube.com/watch?v=CF5buEVrYwo), with some restructuring and ported over to Next.js. You can also follow them [here](https://twitter.com/Dev__Digest/status/1656744114409406467) on Twitter!

### Getting your data

Check out [GPT Repository Loader](https://github.com/mpoon/gpt-repository-loader) which makes it simple to turn any GitHub repo into a text format, preserving the structure of the files and file contents, making it easy to chop up and save into pinecone using my codebase.
