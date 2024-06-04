// nlpService.js
import { useState } from "react";

const useAsticaNLPAPI = () => {
  const [nlpResult, setNLPResult] = useState(null);
  const [nlpError, setNLLError] = useState(null);
  const [nlpLoading, setNLPLoading] = useState(false);

  const callAsticaNLPAPI = async (input) => {
    setNLPLoading(true);
    setNLLError(null);
    setNLPResult(null);

    const asticaAPI_endpoint = "https://nlp.astica.ai/generate";
    const asticaAPI_payload = {
      tkn: "BDA606D8-6900-4269-A83B-2D62FE20887C41A9AA51-57CF-4667-BD83-8E0F779B08BC",
      modelVersion: "GPT-S2",
      input: input,
      instruction: "",
      think_pass: 1,
      temperature: 0.7,
      top_p: 0.35,
      token_limit: 2000,
      stop_sequence: "",
      stream_output: 0,
      low_priority: 0,
    };

    try {
      const response = await fetch(asticaAPI_endpoint, {
        method: "post",
        body: JSON.stringify(asticaAPI_payload),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setNLPResult(data);
    } catch (error) {
      setNLLError(error.message);
    } finally {
      setNLPLoading(false);
    }
  };

  return { nlpResult, nlpError, nlpLoading, callAsticaNLPAPI };
};

export default useAsticaNLPAPI;
