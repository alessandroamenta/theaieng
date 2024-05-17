import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <div className="bg-[#090909] rounded-lg p-6 max-w-md w-full">
        {isSubmitted ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-white">Thank you!</h3>
            <p className="text-gray-300">We&apos;ll reach out soon!</p>
            <Button onClick={onClose} className="mt-6">
              Close
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4 text-white">Submit a design engineer job</h3>
            <p className="text-gray-300 mb-4">
              Add your information below, and we&apos;ll email you for details and $175 Stripe invoice
            </p>
            <ul className="text-gray-300 list-disc pl-5 mb-6">
              <li>Job post is featured for 30 days</li>
              <li>Receive personalized note in weekly newsletter</li>
              <li>Metrics: 10k monthly pageviews, 100+ clicks per post, 75% open rate newsletter</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-6">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#181818] text-white"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#181818] text-white"
                />
                <Input
                  placeholder="Link to job post"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  className="bg-[#181818] text-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitModal;