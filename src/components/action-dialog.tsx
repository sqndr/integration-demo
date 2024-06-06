import { ACTION_VALUE_PARAM_NAME, type Action } from "~/lib/actions";
import { Dialog, DialogContent } from "./ui/dialog";
import { useQueryState } from "nuqs";

type ActionDialogProps = {
  children: React.ReactNode;
  action: Action;
};

export const ActionDialog = ({ action, children }: ActionDialogProps) => {
  const [activeAction, setActiveAction] = useQueryState(
    ACTION_VALUE_PARAM_NAME,
  );

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Dialog
      open={action === activeAction}
      defaultOpen
      onOpenChange={() => setActiveAction(null)}
    >
      <DialogContent className="overflow-x-hidden">
        <div className="mt-20 h-full">
          <div className="-mt-20 flex h-full flex-col justify-between pt-20">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
