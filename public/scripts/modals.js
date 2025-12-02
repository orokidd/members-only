const deleteModal = document.querySelector("#delete-modal")
const confirmButton = document.querySelector(".confirm-btn")
const cancelButton = document.querySelector(".cancel-btn")
const deleteForm = document.querySelector("#post-delete-form")

function openDeleteModal(actionLink) {
    deleteModal.style.display = "flex"
    deleteForm.action = actionLink

    cancelButton.addEventListener("click", () => {
        deleteModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === deleteModal) deleteModal.style.display = "none";
    });
}