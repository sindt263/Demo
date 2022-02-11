function mahoaS(chuoi) {
    var result = chuoi.replace(/%20/g, '').replace(/ /g, '').replace(/\//g, 'S20%KPC').replace(/1/g, 'S21%KPC')
    return result;
}
