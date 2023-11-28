export default function Thanks() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Thanks for submitting!</h1>
        <a href={"/mobile-report"}>
          <button class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors">
            REPORT ANOTHER?
          </button>
        </a>
      </div>
    </div>
  );
}
