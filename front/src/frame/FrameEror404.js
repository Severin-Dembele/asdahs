import { Link } from "react-router-dom";
export default function FrameEror404() {
  return (
    <>
      <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl animate-bounce">
            {" "}
            Page Not Found !
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            We're sorry, but we couldn't find the page you're looking for .
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950 animate-pulse"
            >
              Return to the homepage.
            </Link>
            <a
              href="https://africanhealthstudy.com/"
              className="text-sm font-semibold text-gray-900 animate-pulse"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
