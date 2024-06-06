"use client";

import { api } from "~/trpc/react";
import { DeleteIcon, Icon } from "./_components/icon";
import ConfirmButton from "./_components/confirmation-button";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const utils = api.useUtils();
  const deleteMutation = api.post.deleteById.useMutation();

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      async onSuccess() {
        await utils.post.invalidate();
        router.refresh();
      },
    });
  };

  return (
    <ConfirmButton onClick={handleDelete}>
      <Button variant="destructive" size="icon" aria-label="Delete this item">
        <Icon>
          <DeleteIcon />
        </Icon>
      </Button>
    </ConfirmButton>
  );
};
