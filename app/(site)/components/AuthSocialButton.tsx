import clsx from "clsx";
import { IconType } from "react-icons"

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;

}
const AuthSocialButton = ({
  icon: Icon,
  onClick
}: AuthSocialButtonProps) => {
  return( 
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full
        justify-center
        rounded-md
        bg-blue
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
      "
    > <Icon/></button>
  )
}
export default AuthSocialButton