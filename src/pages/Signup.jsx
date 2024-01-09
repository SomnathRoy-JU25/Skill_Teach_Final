import signupImgage from "../assets/Images/SingUp.jpg"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with Skill Teach for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImgage}
      formType="signup"
    />
  )
}

export default Signup
