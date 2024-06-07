"use client";

import { cloneElement, forwardRef, useState } from "react";

import { Box } from "@radix-ui/themes";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shouldConfirm?: boolean;
  asChild?: boolean;
  children: React.ReactElement<ButtonProps>;
  confirmType?: "dialog" | "remove";
}
const ConfirmButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ shouldConfirm = true, children, onClick, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const originalOnClick = children.props.onClick;

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setOpen((open) => !open);
    };

    return (
      <>
        <Dialog open={open} defaultOpen>
          <DialogContent className="z-[50]">
            <DialogHeader>
              <Box className="relative flex flex-col gap-4 text-center">
                <h3 className="text-3xl font-bold">Are you sure?</h3>
                <div className="text-gray-11">
                  This action cannot be undone.
                </div>
              </Box>
            </DialogHeader>
            <DialogFooter className="sm:flex-row sm:justify-center">
              <div className="flex flex-row items-center justify-center gap-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={originalOnClick}>
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        Ò
        {cloneElement(children, {
          ...props,
          onClick: shouldConfirm ? handleClose : originalOnClick,
        })}
      </>
    );
  },
);
ConfirmButton.displayName = "ConfirmButton";

export default ConfirmButton;
