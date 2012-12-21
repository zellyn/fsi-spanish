(function() {
  var pos_to_names = {H: 'high', M: 'medium', L: 'low'};
  function strong_accent(_, position) {
    return "<span class='wrap1'><span class='strong-" + pos_to_names[position] + "'>&nbsp;&#x0301;</span></span>";
  };
  function weak_accent(_, position) {
    return "<span class='wrap1'><span class='weak-" + pos_to_names[position.toUpperCase()] + "'>.</span></span>";
  };
  function phoneticise(_, part) {
    // unescape d-with-slash
    part = part.replace(/\\-d/g, 'đ');
    // unescape b-with-slash
    part = part.replace(/\\-b/g, 'ƀ');
    // Remove dot from accented lowercase i
    part = part.replace(/(\\[HMLhml])i/g, '$1ı');
    // Turn un-accented lowercase i into weak-low accented undotted i
    part = part.replace(/i/g, '\\lı');
    // Replace strong accents
    part = part.replace(/\\([HML])/g, strong_accent);
    // Replace weak accents
    part = part.replace(/\\([hml])/g, weak_accent);
    // Replace right-dot
    part = part.replace(/\\\./g, "<span class='wrap1'><span class='right-dot'>.</span></span>");
    // Replace little-under-v
    part = part.replace(/\\v/g, "<span class='wrap1'><span class='under-v'>^</span></span>");
    // Replace under-comma
    part = part.replace(/\\,/g, "<span class='wrap1'><span class='under-comma'>,</span></span>");
    return "<tt class='phonetics'>" + part + "</tt>";
  };
  $(document).ready(function() {
    document.body.innerHTML = document.body.innerHTML.replace(/\[\[([^\]]+)\]\]/g, phoneticise);}
  );
})();
