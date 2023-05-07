import { useId, useState, type ComponentPropsWithoutRef, type FC } from "react";
import { Link, useNavigation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ProjectUrl } from "../../const/project-url";
import { Button } from "../base/Button";

const links = [
  { label: "Favorites", href: ProjectUrl.Favorites },
  { label: "Arena", href: ProjectUrl.Arena },
];

const buttons = [
  { label: "Login", href: ProjectUrl.Login },
  { label: "Registration", href: ProjectUrl.Register },
];

export type NavigationProps = ComponentPropsWithoutRef<"header">;

export const Navigation: FC<NavigationProps> = (props) => {
  const { className, ...rest } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  const { location } = useNavigation();

  return (
    <header {...rest} className={className}>
      <nav
        className={
          "bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
        }
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={ProjectUrl.Home} className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Pokemon
            </span>
          </Link>
          <div className="flex gap-2 flex-wrap items-center lg:order-2">
            {buttons.map((button) => (
              <Button
                key={button.href}
                href={button.href}
                text={button.label}
              />
            ))}

            <Button text={"Edit"} href={ProjectUrl.Edit} />
            <Button text={"Logout"} />
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">
                {isMenuOpen ? "close" : "open"} main menu
              </span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={twMerge(
              "justify-between items-center w-full lg:flex lg:w-auto lg:order-1",
              !isMenuOpen ? "hidden" : ""
            )}
            id={menuId}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={twMerge(
                      "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700",
                      location?.pathname === link.href &&
                        "text-white dark:text-white"
                    )}
                    aria-current={
                      location?.pathname === link.href ? "page" : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
