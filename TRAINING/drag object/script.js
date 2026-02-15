const pieces = document.querySelectorAll(".piece");
const slots = document.querySelectorAll(".slot");

let draggedPiece = null;

// ==========================
// DRAG POTONGAN
// ==========================
pieces.forEach(piece => {
  piece.draggable = true;

  piece.addEventListener("dragstart", () => {
    draggedPiece = piece;
  });
});

// ==========================
// SLOT PUZZLE
// ==========================
slots.forEach(slot => {

  slot.addEventListener("dragover", e => {
    e.preventDefault(); // wajib agar bisa drop
  });

  slot.addEventListener("drop", () => {
    if (!draggedPiece) return;

    const piecePos = draggedPiece.dataset.pos;
    const slotPos = slot.dataset.pos;

    // jika posisi benar
    if (piecePos === slotPos) {
      slot.appendChild(draggedPiece);
      draggedPiece.draggable = false;
      draggedPiece.style.cursor = "default";
      slot.style.border = "2px solid green";
    }
  });

});
