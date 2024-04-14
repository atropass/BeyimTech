import { X } from "lucide-react";
import { Modal } from "react-daisyui";
import { Button } from "../../../shared/ui/button/button";
import { Input } from "../../../shared/ui/input/input";
import { useState } from "react";
interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
}
export const AddStudentModal = ({ open, onClose }: AddStudentModalProps) => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    setEmail("");
  };
  return (
    <div className="w-screen h-screen">
      <Modal open={open}>
        <div className="absolute right-4 top-4">
          <X onClick={onClose} color="gray" />
        </div>
        <p className="mb-4 font-bold text-lg">Добавить ученика</p>
        <Input
          label="E-mail ученика"
          size="sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-4">
          <Button size="sm" onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
      </Modal>
    </div>
  );
};
