import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

let camera: any, scene: any, renderer: any;
let cameraControls: any;
let effectController: any | boolean;
const teapotSize = 300;
let ambientLight: any, light: any;

let tess = -1; // force initialization
let bBottom: any;
let bLid: any;
let bBody: any;
let bFitLid: any;
let bNonBlinn: any;
let shading: any;
let teapot: any, textureCube: any;

const materials: any = {};

const Threejs: React.FC = () => {
  // 初始化Threejs
  function init() {
    const container = document.getElementById('container')!;
    // document.body.appendChild(container);

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // CAMERA——相机
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      80000,
    );
    camera.position.set(-600, 550, 1300);

    // LIGHTS阴影部分颜色
    ambientLight = new THREE.AmbientLight(0x7c7c7c);
    // 高亮部分颜色
    light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(0.32, 0.39, 0.7);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, canvasHeight);
    container.appendChild(renderer.domElement);

    // EVENTS——事件监听
    window.addEventListener('resize', onWindowResize);

    // CONTROLS
    cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener('change', render);

    // TEXTURE MAP
    const textureMap: any = new THREE.TextureLoader().load(
      'textures/uv_grid_opengl.jpg',
    );
    textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
    textureMap.anisotropy = 16;
    textureMap.colorSpace = THREE.SRGBColorSpace;

    // REFLECTION MAP
    const path = 'textures/cube/pisa/';
    const urls = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'];

    textureCube = new THREE.CubeTextureLoader().setPath(path).load(urls);

    materials['wireframe'] = new THREE.MeshBasicMaterial({ wireframe: true });
    materials['flat'] = new THREE.MeshPhongMaterial({
      specular: 0x000000,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    materials['smooth'] = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
    });
    materials['glossy'] = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });
    materials['textured'] = new THREE.MeshPhongMaterial({
      map: textureMap,
      side: THREE.DoubleSide,
    });
    materials['reflective'] = new THREE.MeshPhongMaterial({
      envMap: textureCube,
      side: THREE.DoubleSide,
    });

    // scene itself
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    scene.add(ambientLight);
    scene.add(light);

    // GUI
    effectController = {
      newTess: 15,
      bottom: true,
      lid: true,
      body: true,
      fitLid: false,
      nonblinn: false,
      newShading: 'glossy',
    };
  }

  // EVENT HANDLERS
  function onWindowResize() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth, canvasHeight);

    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();

    render();
  }

  function render() {
    if (
      effectController.newTess !== tess ||
      effectController.bottom !== bBottom ||
      effectController.lid !== bLid ||
      effectController.body !== bBody ||
      effectController.fitLid !== bFitLid ||
      effectController.nonblinn !== bNonBlinn ||
      effectController.newShading !== shading
    ) {
      tess = effectController.newTess;
      bBottom = effectController.bottom;
      bLid = effectController.lid;
      bBody = effectController.body;
      bFitLid = effectController.fitLid;
      bNonBlinn = effectController.nonblinn;
      shading = effectController.newShading;

      createNewTeapot();
    }

    // skybox is rendered separately, so that it is always behind the teapot.
    if (shading === 'reflective') {
      scene.background = textureCube;
    } else {
      scene.background = null;
    }

    renderer.render(scene, camera);
  }

  // Whenever the teapot changes, the scene is rebuilt from scratch (not much to it).
  function createNewTeapot() {
    if (teapot !== undefined) {
      teapot.geometry.dispose();
      scene.remove(teapot);
    }

    const geometry = new TeapotGeometry(
      teapotSize,
      tess,
      effectController.bottom,
      effectController.lid,
      effectController.body,
      effectController.fitLid,
      !effectController.nonblinn,
    );

    teapot = new THREE.Mesh(geometry, materials[shading]);

    scene.add(teapot);
  }

  useEffect(() => {
    init();
    render();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div id="container" />
    </div>
  );
};

export default Threejs;
