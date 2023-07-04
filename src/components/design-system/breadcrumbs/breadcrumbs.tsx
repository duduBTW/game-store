import { Children } from "react";
import { Props } from "./breadcrumbs.props";
import { BreadcrumbsContainer } from "./breadcrumbs.styles";

function Breadcrumbs({ children }: Props) {
  const childrenCount = Children.count(children);
  const content: React.ReactNode[] = [];

  Children.forEach(children, (child, index) => {
    content.push(child);

    const isLastChild = index + 1 === childrenCount;
    if (isLastChild) {
      return;
    }

    content.push(<BreadcrumbsSeparator key={index} />);
  });

  return <BreadcrumbsContainer>{content}</BreadcrumbsContainer>;
}

export function BreadcrumbsSeparator() {
  return <img src="/breadcrumbs_separator.svg" />;
}

export default Breadcrumbs;
