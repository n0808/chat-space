$(function(){
  //一致するユーザーがいた場合の処理
  function addUser(user) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
                //作ったhtmlをいれる
    $("#UserSearchResult").append(html);
  }
 //一致するユーザーがいなかった場合の処理
  function addNoUser() {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
                //作ったhtmlをいれる
    $("#UserSearchResult").append(html);
  }
  function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  }

  $("#UserSearch__field").on("keyup",function(){
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    //jbuilderファイルで作った配列を引数にしdone関数を起動
    .done(function(users) {
      //if,else if,elseどの場合においても、処理後は、すでに検索欄に出力されている情報を削除する。
      $(".UserSearchResult").empty();
      //検索に一致するユーザーが０じゃない場合(いる場合)
      if (users.length !== 0){
        //usersという配列をforEachで分解し、ユーザーごとにaddUser関数に飛ばす(処理は後ほど)
        users.forEach(function(user){
          addUser(user);
        });
        //入力欄に文字が入力されてない場合処理を終了
      } else if (input.length == 0) {
        return false;
        //検索に一致するユーザーがいない場合はaddNoUserに飛ばす
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
  //追加ボタンがクリックされた時の処理を記述する
  $("#UserSearchResult").on("click", ".ChatMember__add", function() {
    //クリックされたところのデータを取得し各変数に代入
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");

    //クリックされたところのhtmlを親要素をごと消す（検索結果から消す）
    $(this)
      .parent()
      .remove();
    addMember(userName, userId);
  });
  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});
