import Image from 'next/image';
import FormField from './_components/FormField';

export default function Home() {
  return (
    <div>
      <div className="hero bg-base-200 ">
        <div className="hero-content text-center min-h-screen">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-primary">Hello there</h1>
            <p className="py-6 text-black">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 py-ten min-h-screen">
        <FormField />
      </div>
    </div>
  );
}
