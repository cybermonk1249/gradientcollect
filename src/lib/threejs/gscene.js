import { render } from 'svelte/server';
import * as THREE from 'three';
import { OrbitControls  } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';

import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { base } from "$app/paths";


let model = null;

export const createScene = (element) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
    

    // --- CUBE ---
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // --- ----
    
    const renderer = new THREE.WebGLRenderer( {antialias: true, canvas: element} );
    
    const loader = new GLTFLoader();
    loader.load('logo3d.glb', function ( gltf ) {
        model = gltf.scene;
        scene.add( model );
    }, undefined, function ( error ) {
        console.error( error );
    });


    camera.position.z = 5;

    const controls = new OrbitControls(camera, element);
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.update();
    
    // --- LIGHT ---
    const color = 0xa0a0a0;
    const intensity = 10;
    const ambientlight = new THREE.AmbientLight(color, intensity);
    scene.add( ambientlight );

    const pointlight = new THREE.PointLight(color, intensity);
    pointlight.position.set( 3, 15, 2 );
    scene.add( pointlight );
    // --- END LIGHT ---
    
    // --- POST PROCESSING ---
    const composer = new EffectComposer( renderer );
    const renderPass = new RenderPass( scene, camera  );
    composer.addPass( renderPass );

    const effect1 = new ShaderPass( DotScreenShader );
	effect1.uniforms[ 'scale' ].value = 4;
	composer.addPass( effect1 );

    const effect2 = new ShaderPass( RGBShiftShader );
	effect2.uniforms[ 'amount' ].value = 0.0115;
	composer.addPass( effect2 );

    const effect3 = new BloomPass(1, 20, 9, 512);
    composer.addPass( effect3 );

	const effect4 = new OutputPass();
	composer.addPass( effect4 );
    

    // --- END POST PROCESSING ---

    const animate = () => {
        requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        
        if (model) {
            model.rotation.x += 0.004;
            model.rotation.y += 0.002;
            model.rotation.z += 0.0005;
        }
        composer.render();
        // renderer.render(scene, camera);
    }


    const resize = () => {
        const width = element.clientWidth;
        const height = element.clientHeight;
        
        if (width !== element.width || height !== element.height) {
            renderer.setSize(width, height)
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }

    // canvas = element;
    resize();
    animate();

    window.addEventListener('resize', resize);
}
