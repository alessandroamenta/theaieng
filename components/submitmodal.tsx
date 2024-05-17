import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SubmitModalProps {
  onClose: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if all fields are filled out
    if (name && email && jobLink) {
      setIsFormValid(true);
      setErrorMessage("");
    } else {
      setIsFormValid(false);
    }
  }, [name, email, jobLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setErrorMessage("Please fill out all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/new-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, jobLink }),
      });

      if (response.ok) {
        console.log("Job submitted successfully!");
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit job.");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-[#090909] rounded-lg p-6 max-w-md w-[360px] border border-[#181818]">
        {isSubmitted ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-white">Thank you!</h3>
                  <p className="text-gray-300">We&apos;ll reach out soon! <br />
                  Look out for an email from us.</p>
                  <Button onClick={onClose} className="mt-6 border border-[#181818]">
              Close
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4 text-white">Submit an AI engineering job</h3>
            <p className="text-gray-300 mb-4" style={{ fontSize: "16px" }}>
              Add your information below, and we&apos;ll email you for details and a $175 invoice
            </p>
            <ul className="text-gray-300 list-disc pl-5 mb-6" style={{ fontSize: "14px" }}>
              <li>Job post is featured for 30 days</li>
              <li>Metrics: 10k monthly pageviews, 100+ clicks per post, 75% open rate newsletter</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-6">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border border-[#2f2f2f] h-8 px-6 py-2 text-sm md:text-base rounded-md focus:outline-none focus:border-gray-400 placeholder:text-[#595959]"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-[#2f2f2f] h-8 px-6 py-2 text-sm md:text-base rounded-md focus:outline-none focus:border-gray-400 placeholder:text-[#595959]"
                />
                <Input
                  placeholder="Link to job post"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  className="bg-transparent border border-[#2f2f2f] h-8 px-6 py-2 text-sm md:text-base rounded-md focus:outline-none focus:border-gray-400 placeholder:text-[#595959]"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={onClose} className="rounded-md bg-[#090909] border border-[#181818] text-[#595959]">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-md bg-[#090909] border border-[#181818] transition duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  disabled={!isFormValid}
                >
                  Submit
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitModal;