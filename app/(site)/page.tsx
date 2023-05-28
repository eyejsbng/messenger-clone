import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home(){
  return (
  <div className="flex min-h-full bg-gray-100 flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image alt="Messenger Logo" height={50} width={50} src="/images/logo.png" className="mx-auto w-auto" />
         <h2 className="mt-6 text-center">Sign in to your account</h2>
      </div> 
      <AuthForm/>
    </div>
  );
}