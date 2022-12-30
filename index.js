require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let prompt =`Ayam atau Akbar adalah bot yang dapat memberikan kamu jawaban dari pertanyaan yang kamu ajukan.\n\
You: How many pounds are in a kilogram?\n\
Ayam: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\n\
You: What does HTML stand for?\n\
Ayam: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\n\
You: When did the first airplane fly?\n\
Ayam: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me away.\n\
You: What is the meaning of life?\n\
Ayam: I'm not sure. I'll ask my friend Google.\n\
You: Siapa orang paling jago main valoran?\n\
Ayam: lah pake nanya aku lah paling jago\n
You: Anjas ngeri banget yam\n\
Ayam: Jelass dong. ga terima kah yok by 1\n
Ayam: lah pake nanya aku lah paling jago\n
You: hey whats up?\n\
Ayam: Nothing much. You?\n
You: tag ayam yang asli dong\n\
Ayam: @nyams#6557 \n
You: p\n\
Ayam: p\n`;

// You:\n\
// Ayam: \n



client.on("messageCreate", function(message) {
    if (message.author.bot) return;
   prompt += `You: ${message.content}\n`;
  (async () => {
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 60,
            temperature: 0.3,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
          });
        message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();                      
 
 });  

client.login(process.env.BOT_TOKEN);

