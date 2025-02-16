import axios from "axios";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_components/_data/Lookup";
import { Loader2Icon } from "lucide-react";
import Prompt from "@/app/_components/_data/Prompt";

const LogoIdea = ({ onHandleInputChange, formData }) => {
  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);

  useEffect(() => {
    generateLogoDesignIdea();
  }, []);

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design.title
    )
      .replace("{logoTitle}", formData.title)
      .replace("{logoDesc}", formData.desc)
      .replace("{logoPrompt}", formData.design.prompt);

    console.log(PROMPT);
    const result = await axios.post("/api/ai-design-ideas", {
      prompt: PROMPT,
    });

    console.log(result.data);
    setIdeas(result.data.ideas);
    setLoading(false);
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className="flex flex-wrap gap-3 mt-6">
        {ideas &&
          ideas.map((item, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
                selectedOption == item && "border-primary"
              }`}
              onClick={() => setSelectedOption(item)}
            >
              {item}
            </h2>
          ))}
      </div>
      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10" />}
      </div>
    </div>
  );
};

export default LogoIdea;
