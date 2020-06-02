function pieceToSymb(piece_id){
    let symb = ""
    switch(piece_id.slice(0,2)){
        case "pa":
            symb = 'p'
            break;
        case "ro":
            symb = 'r'
            break;
        case "kn":
            symb = 'n'
            break;
        case "bi":
            symb = 'b'
            break;
        case "qu":
            symb = 'q'
            break;
        case "ki":
            symb = 'k'
            break;
        default:
            symb = '?'
            break;
    }
    if(piece_id.indexOf("_w") !== -1) {
        symb = symb.toUpperCase()
    }
    return symb
}

function squaresToRows(squares_og){
    let squares = squares_og.slice()
    squares.reverse()
    let rows = []
    for (let i = 0; i < 64; i += 8){
        rows.push(squares.slice(i, i+8))
    }
    return rows
}

export function squaresToFEN(squares_og){
    const rows = squaresToRows(squares_og)
    let result = ""
    rows.forEach(row => {
        let row_str = ""
        let null_counter = 0
        row.forEach(piece => {
            if (piece){
                if (null_counter > 0){
                    row_str += String(null_counter)
                    null_counter = 0
                }
                row_str += pieceToSymb(piece)
            }
            else {
                null_counter += 1
            }
        });
        if (null_counter > 0) { row_str += String(null_counter)}
        result += row_str + "/"
    });
    result = result.slice(0,-1)
    result += " w - - 0 1"
    return result
}

export function indexToAlpha(i){
    const letters = "hgfedcba"
    const numbers = "12345678"
    const row = Math.floor(i / 8)
    const col = i % 8
    return letters[col] + numbers[row]
}