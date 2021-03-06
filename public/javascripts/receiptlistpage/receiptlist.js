$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupCartCount();
  setupList();
}

function setupList() {  
  Storage.getReceiptList(setReceiptList);
}

function setupCartCount() {
  Storage.getCartCount(setCartCount);
}

function setCartCount(total) {
  $('#cartCount').html(total);
}

function setReceiptList(receiptlist) {
  receiptlist.reverse();
  receiptlist.forEach(function(receipt) {
    var tr =
      "<tr class='row'>" +
      "<td>" + receipt.date + "</td>" +
      "<td>￥" +  parseFloat(receipt.total).toFixed(2) + "</td>" +
      "<td><button type='text' class='btn btn-lg btn-danger btn-xs' data-date='" + receipt.date +
      "' name='detailBtn'><span class='glyphicon glyphicon-align-justify'></span></button></td>" +
      "</tr>";

    $("#tableView").append(tr);
  })
  setBtnAction();
}

function setBtnAction() {
  setCartBtnAction();
  setLogoBtnAction();
  setDetailBtnAction();
}

function setCartBtnAction() {
  $('#cartBtn').click(function() {
    window.location.href = '../cart';
  });
}

function setLogoBtnAction() {
  $('#logoBtn').click(function() {
    window.location.href = '../';
  });
}

function setDetailBtnAction() {
  $('button[name="detailBtn"]').click(function() {
    var date = this.dataset.date;
    saveCurrentReceipt(date);
  });
}

function saveCurrentReceipt(date) {
  Storage.getReceiptList(function(receiptlist) {
    for (var i = 0; i < receiptlist.length; i++) {
      if (receiptlist[i].date === date) {
        Storage.setCurrentReceipt(receiptlist[i]);
        window.location.href='../receipt';
      }
    }
  });
  
}