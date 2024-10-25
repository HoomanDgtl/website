import classNames from "clsx";

const p = "    prose-p:text-xs md:prose-p:text-sm lg:prose-p:text-base  ";
const h1 =
  " prose-h1:text-3xl   md:prose-h1:text-4xl prose-h1:font-bold prose-h1:text-foreground    lg:prose-h1:text-6xl  ";
const h2 =
  " prose-h2:text-xl   md:prose-h2:text-2xl   prose-h2:font-medium  lg:prose-h2:text-3xl  ";

const h3 =
  " prose-h3:text-base   md:prose-h3:text-xl  prose-h3:font-medium   lg:prose-h3:text-2xl  ";
const h4 =
  " prose-h4:text-sm   md:prose-h4:text-base  prose-h3:font-medium   lg:prose-h4:text-lg  ";

const h5 =
  "prose-h5:mt-4 prose-h5:mb-3 prose-h5:text-sm lg:prose-h5:text-base prose-h5:font-medium ";
const ul =
  " prose-ul:font-os   prose-ul:text-xs md:prose-ul:text-sm lg:prose-ul:text-base";
const ol =
  " prose-ol:font-os   prose-ol:text-xs md:prose-ol:text-sm lg:prose-ol:text-base";
const table =
  " prose-table:overflow-x-auto prose-tr:border-defaultBorder  prose-table:border-b prose-td:py-4 prose-td:text-start prose-td:text-para  prose-thead:text-justify prose-th:text-para prose-thead:border-defaultBorder prose-table:table-auto md:prose-thead:text-xs md:prose-thead:font-medium   md:prose-th:px-4 prose-td:px-2 md:prose-td:px-4 md:prose-td:text-sm  ";

export const proseClasses = classNames(
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  ul,
  table,
  ol,
  "prose max-w-full prose-a:text-primary prose-a:no-underline prose-img:w-full  text-foreground prose-hr:border-defaultBorder",
);

const className = proseClasses;
export { className as docsProseClasses };
