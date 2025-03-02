import { toast } from "../../core/hooks/useToast.ts";
import { useAppStore } from "../../core/stores/appStore.ts";
import { useDevice } from "../../core/stores/deviceStore.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../UI/Dialog.tsx";
import type { Protobuf } from "@meshtastic/core";
import { numberToHexUnpadded } from "@noble/curves/abstract/utils";
import { TrashIcon } from "lucide-react";

import { Button } from "../UI/Button.tsx";

export interface NodeOptionsDialogProps {
  node: Protobuf.Mesh.NodeInfo | undefined;
  open: boolean;
  onOpenChange: () => void;
}

export const NodeOptionsDialog = ({
  node,
  open,
  onOpenChange,
}: NodeOptionsDialogProps) => {
  const { setDialogOpen, connection, setActivePage } = useDevice();
  const {
    setNodeNumToBeRemoved,
    setNodeNumDetails,
    setChatType,
    setActiveChat,
  } = useAppStore();
  const longName = node?.user?.longName ??
    (node ? `!${numberToHexUnpadded(node?.num)}` : "Unknown");
  const shortName = node?.user?.shortName ??
    (node ? `${numberToHexUnpadded(node?.num).substring(0, 4)}` : "UNK");

  function handleDirectMessage() {
    if (!node) return;
    setChatType("direct");
    setActiveChat(node.num);
    setActivePage("messages");
  }

  function handleRequestPosition() {
    if (!node) return;
    toast({
      title: "Requesting position, please wait...",
    });
    connection?.requestPosition(node.num).then(() =>
      toast({
        title: "Position request sent.",
      })
    );
    onOpenChange();
  }

  function handleTraceroute() {
    if (!node) return;
    toast({
      title: "Sending Traceroute, please wait...",
    });
    connection?.traceRoute(node.num).then(() =>
      toast({
        title: "Traceroute sent.",
      })
    );
    onOpenChange();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${longName} (${shortName})`}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-1">
          <div>
            <Button onClick={handleDirectMessage}>Direct Message</Button>
          </div>
          <div>
            <Button onClick={handleRequestPosition}>Request Position</Button>
          </div>
          <div>
            <Button onClick={handleTraceroute}>Trace Route</Button>
          </div>
          <div>
            <Button
              key="remove"
              variant="destructive"
              onClick={() => {
                setNodeNumToBeRemoved(node.num);
                setDialogOpen("nodeRemoval", true);
              }}
            >
              <TrashIcon />
              Remove
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setNodeNumDetails(node.num);
                setDialogOpen("nodeDetails", true);
              }}
            >
              More Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
