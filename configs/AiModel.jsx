const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // if using client-side
// const apiKey = process.env.GEMINI_API_KEY; // if using server-side only
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Based on Logo of type Indian Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with decription: Indian Restaurant and refering to prompt: "A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.",\n. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "ideas": [\n    "Chef Elephant holding spices",\n    "Smiling Tiger with Curry Pot",\n      "Friendly Parrot with Chili",\n     "Dancing Peacock with Naan",\n     "Animated Maharaja with Thali"\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a text prompt to create Logo for Logo Title/Brand name : title,with description: itle, with Color combination of Earthy Browns, also include the {logoIdea} and include Modern Sharp Lined Logos design idea and Referring to this Logo Prompt:Design a creative and artistic logo with a retro-modern vibe that showcases the brand's identity. Use bold outlines, intricate patterns, and vibrant, contrasting colors to make the design pop. Incorporate thematic elements like food, nature, technology, or lifestyle symbols depending on the brand's niche. The typography should be playful yet clear, complementing the overall composition with a dynamic and balanced layout. Ensure the logo feels unique, versatile, and eye-catching  Give me result in JSON portal with prompt field only\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "prompt": "Design a modern, sharp-lined logo for \\"title\\" (itle). Use an earthy brown color palette. Incorporate {logoIdea} into the design. Refer to the following inspiration: A creative and artistic logo with a retro-modern vibe showcasing the brand\'s identity. Use bold outlines, intricate patterns (where appropriate for a sharp-lined design), and vibrant, *contrasting* earthy browns (think different shades and textures of brown). Incorporate thematic elements related to the brand\'s niche [Describe the niche here if available - e.g., food, nature, technology, lifestyle]. The typography should be clean and modern, complementing the sharp lines and balanced layout. Ensure the logo feels unique, versatile, and eye-catching.  Prioritize clean lines and a modern aesthetic over overly intricate patterns."\n}\n```\n',
        },
      ],
    },
  ],
});
