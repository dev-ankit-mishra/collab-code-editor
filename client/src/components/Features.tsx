import { FiUsers } from 'react-icons/fi';
import { BsKeyboard } from 'react-icons/bs';
import { HiOutlineAcademicCap } from 'react-icons/hi';

export default function Features() {
  const features = [
    {
      id: 1,
      title: "Real-Time Team Collaboration",
      description:
        "Code together with your team or friends in real time, from anywhere. Instantly see changes, follow collaborators' cursors, and avoid merge conflicts with seamless live editing.",
      icon: <FiUsers className="text-4xl text-blue-200" />
    },
    {
      id: 2,
      title: "Live Coding Interviews",
      description:
        "Conduct technical interviews in a shared coding environment. Interviewers and candidates can solve problems collaboratively, review code instantly, and communicate effectively.",
      icon: <BsKeyboard className="text-4xl text-blue-200" />
    },
    {
      id: 3,
      title: "Remote Learning & Mentorship",
      description:
        "Empower virtual classrooms and mentorship with live code sharing. Instructors and learners can work on the same code, ask questions, and solve problems together in real time.",
      icon: <HiOutlineAcademicCap className="text-4xl text-blue-200" />
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-950 to-slate-900 py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Collaborate, Interview, and Learn—All in One Place
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600  rounded-lg mx-auto mt-8 mb-12 hover:w-28 transition duration-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center pt-20">
          {features.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm p-6 hover:shadow-lg transition"
            >
              <div className="mb-4 flex items-center justify-center">{icon}</div>
              <h3 className="text-xl font-semibold text-center mb-3">{title}</h3>
              <p className="text-white/80 text-center tracking-wide leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
