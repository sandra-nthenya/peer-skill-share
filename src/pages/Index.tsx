
import SignUpSteps from "@/components/SignUpSteps";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Skill Exchange Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with professionals, share your expertise, and grow your skills
            through peer-to-peer learning.
          </p>
        </div>
        <SignUpSteps />
      </div>
    </div>
  );
};

export default Index;
