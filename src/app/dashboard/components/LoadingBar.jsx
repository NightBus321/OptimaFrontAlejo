import { ArrowPathIcon } from "@heroicons/react/24/solid";
export default function LoadingBar() {
  return (
    <div className="flex justify-center items-center h-24">
      <ArrowPathIcon className="animate-spin h-8 w-8 text-primaryColor" />
    </div>
  );
}
