import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full py-0.5 px-4 border-t bg-gray-800 text-white ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="hidden md:block">Taskify @ {new Date().getFullYear()}</div>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Footer;
