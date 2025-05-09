import { Button } from '@magnetic/ui';

interface Props {
  title: string;
  message: string;
  show: boolean;
  onClickConfirm: () => void;
  onClickCancel: () => void;
  isSaving?: boolean;
}

function ConfirmAlert(props: Props) {
  const { message, show, title, onClickConfirm, onClickCancel, isSaving } =
    props;

  return (
    <dialog className={`modal ${show && 'modal-open'}`}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <div className="flex gap-3">
              <Button
                className=""
                variant="outline"
                color="neutral"
                onClick={onClickCancel}
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={onClickConfirm}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Yes, confirm'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmAlert;
