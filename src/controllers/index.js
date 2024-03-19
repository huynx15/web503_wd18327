export let classname = "WD18327";
export const getHome = (req, res) => {
    res.render('index', { className: classname });
}