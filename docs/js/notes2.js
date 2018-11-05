window.addEventListener("load", function (event) {
  const width = 960;
  const height = 480;
  const mouse = new THREE.Vector2();
  const canvas = document.querySelector("#myCanvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(width, height);
  const scene = new THREE.Scene();
  //カメラ
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  // レイキャストを作成
  const raycaster = new THREE.Raycaster();
  camera.position.set(0, 0, +1000);
  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光源
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  //  const mesh2 = new THREE.Mesh(geometry, material);
  //  mesh2.rotation.x = Math.random() * 2 * Math.PI;
  //  mesh2.rotation.y = Math.random() * 2 * Math.PI;
  //  mesh2.rotation.z = Math.random() * 2 * Math.PI;

  var touchStartX;
  var touchStartY;
  var touchMoveX;
  var touchMoveY;
  var flg = false;
  var meshList = [];
  var j = 0;

  for (var i = 0; i < 100; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    meshList.push(mesh);
  }

  // 開始時
  window.addEventListener("mousedown", function (event) {
    console.log("down");
    flg = true;
  }, false);

  // 移動時
  window.addEventListener("mousemove", function (event) {

    if (flg == true) {
      const x = event.clientX - width / 2 + (event.clientX - width / 2);
      const y = event.clientY - height / 2 + (event.clientY - height / 2);

      mouse.x = x;
      mouse.y = -y;

      meshList[j].position.x = x;
      meshList[j].position.y = -y;
      meshList[j].rotation.x = Math.random() * 2 * Math.PI;
      meshList[j].rotation.y = Math.random() * 2 * Math.PI;
      meshList[j].rotation.z = Math.random() * 2 * Math.PI;
      scene.add(meshList[j]);
      if (j < 99) {
        j = j + 1;
      } else {
        j = 0;
      }
    }
  }, false);

  // 終了時
  window.addEventListener("mouseup", function (event) {
    console.log("up");
    flg = false;
  }, false);


  tick();

  function tick() {

    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, camera);
    // その光線とぶつかったオブジェクトを得る
    const intersects = raycaster.intersectObjects(meshList);
    meshList.map(mesh => {
      // 交差しているオブジェクトが1つ以上存在し、
      // 交差しているオブジェクトの1番目(最前面)のものだったら
      if (intersects.length > 0 &&
        mesh === intersects[0].object) {
        // 色を赤くする
        mesh.material.color.setHex(0xFF0000);
      } else {
        // それ以外は元の色にする
        mesh.material.color.setHex(0xFFFFFF);
      }
    });

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }


}, false);

//function handleMouseMove(event) {
//        const element = event.currentTarget;
//        // canvas要素上のXY座標
//        const x = event.clientX - element.offsetLeft;
//        const y = event.clientY - element.offsetTop;
//        // canvas要素の幅・高さ
//        const w = element.offsetWidth;
//        const h = element.offsetHeight;
//        // -1〜+1の範囲で現在のマウス座標を登録する
//        mouse.x = (x / w) * 2 - 1;
//        mouse.y = -(y / h) * 2 + 1;
//      }
