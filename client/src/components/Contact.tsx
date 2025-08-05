import Button from "./Button";
import Input from "./Input";
import { FiSend } from 'react-icons/fi';

export default function Contact() {
  function handleFormSubmit() {}
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-neutral-950 to-zinc-900 px-52 py-6">
      <main className="flex flex-col  justify-center">
        <h1 className="text-5xl mb-2 text-center font-bold mt-4">Reach Out & Let’s Talk</h1>
        <p className="text-xl text-center text-gray-400 mb-8">Feel free to reach out for collaborations, quotes, or inquiries.</p>

        <div className="w-20 h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600  rounded-lg mx-auto  mb-12 hover:w-32 transition duration-500" />
        <form onSubmit={handleFormSubmit} className="space-y-7">
          <div>
            <label htmlFor="name" className="block pb-0.5 text-[17px]">Name</label>
          <Input id="name" name="name" type="text" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block pb-0.5 text-[17px]">Email</label>
          <Input id="email" name="email" type="email" placeholder="example@email.com" />
          </div>
          <div className="mb-10">
          <label htmlFor="message" className="block pb-0.5 text-[17px]">Message</label>
          <textarea id="message" name="message" rows={5} cols={30} placeholder="Type your message here..." className="w-full px-3 py-1 rounded-md bg-gray-800 border border-white/10  text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"></textarea>
          </div>
          <Button className="w-full text-lg  font-medium">
            <FiSend size={20}/>Send Message
          </Button>
          
          
          
        </form>
      </main>
    </section>
  );
}
