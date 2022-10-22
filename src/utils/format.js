export const formatBirth = (id) => {
    if(id===undefined) return;
    let birthday = '';
    if (id.length === 15) {
      birthday = '19' + id.slice(6, 12);
    } else if (id.length === 18) {
      birthday = id.slice(6, 14);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
    return birthday;
  };
  
  export const formatYear = (id, type) => {
    if(id===undefined) return;
    let year = '';
    const dateNow = new Date();
  
    if (type === 'age') {
      year = formatBirth(id); //-
    }
    return dateNow.getFullYear() - year.substring(0, 4);
  };