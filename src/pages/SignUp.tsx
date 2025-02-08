
import Navigation from "@/components/Navigation";
import SignUpSteps from "@/components/SignUpSteps";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Join SkillSwap
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create your account and start exchanging skills with professionals worldwide.
        </p>
        <SignUpSteps />
      </div>
    </div>
  );
};

export default SignUp;
