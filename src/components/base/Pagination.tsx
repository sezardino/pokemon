import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";
import { Typography } from "./Typography";

export interface PaginationProps extends ComponentPropsWithoutRef<"div"> {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  prevText?: string;
  nextText?: string;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const {
    totalPages,
    prevText = "Previous",
    nextText = "Next",
    currentPage,
    onPageChange,
    className,
    ...rest
  } = props;

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const paginationItems = useMemo(() => {
    if (totalPages > 8) {
      const displayedPages: (null | number)[] = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];

      if (currentPage > 3) {
        displayedPages.unshift(null);
        displayedPages.unshift(1);
      }

      if (currentPage < totalPages - 2) {
        displayedPages.push(null);
        displayedPages.push(totalPages);
      }

      return displayedPages.filter((page) =>
        typeof page === "number" ? page >= 1 && page <= totalPages : true
      );
    }

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div {...rest} className={twMerge("flex", className)}>
      <PaginationItem
        type="prev"
        text={prevText}
        disabled={currentPage === 1}
        className="rounded-l-lg"
        onClick={handlePrevClick}
      />

      {paginationItems.map((index) => (
        <PaginationItem
          key={index}
          text={index ? index.toString() : "..."}
          disabled={!index}
          isCurrent={index === currentPage}
          onClick={() => index && onPageChange(index)}
        />
      ))}

      <PaginationItem
        type="next"
        text={nextText}
        disabled={currentPage === totalPages}
        className="rounded-r-lg"
        onClick={handleNextClick}
      />
    </div>
  );
};

interface ItemProps extends Omit<ComponentPropsWithoutRef<"button">, "type"> {
  isCurrent?: boolean;
  text: string;
  type?: "prev" | "next" | "page";
}

const PaginationItem: FC<ItemProps> = (props) => {
  const {
    type = "page",
    text,
    isCurrent = false,
    disabled,
    className,
    ...rest
  } = props;

  const isButtonDisabled = disabled || isCurrent;

  return (
    <button
      {...rest}
      type="button"
      disabled={isButtonDisabled}
      aria-current={isCurrent ? "page" : false}
      className={twMerge(
        "px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-r-0 border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ",
        isCurrent &&
          "text-blue-600 border border-gray-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        !isButtonDisabled &&
          "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white",
        className
      )}
      aria-label={type !== "page" ? text : undefined}
    >
      {type !== "page" && (
        <Icon name={type === "next" ? "MdChevronRight" : "MdChevronLeft"} />
      )}
      {type === "page" && <Typography as="span" variant="light" text={text} />}
    </button>
  );
};
