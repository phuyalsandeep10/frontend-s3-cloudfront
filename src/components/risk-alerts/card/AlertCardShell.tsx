
import React from "react";
import AlertCardWrapper from "./AlertCardWrapper";
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface AlertCardShellProps {
  severity: string;
  onClick: () => void;
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}

const AlertCardShell: React.FC<AlertCardShellProps> = ({
  severity,
  onClick,
  header,
  content,
  footer
}) => {
  return (
    <AlertCardWrapper severity={severity} onClick={onClick}>
      <CardHeader className="pb-2">{header}</CardHeader>
      <CardContent className="text-sm pb-2">{content}</CardContent>
      <CardFooter className="flex justify-between pt-2">{footer}</CardFooter>
    </AlertCardWrapper>
  );
};

export default AlertCardShell;

