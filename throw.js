AFRAME.registerComponent('set-bowling-balls', {
    init : function(){
        this.throwBalling()

    },
    throwBalling :function(){
        window.addEventListener('keydown', (e) =>{
            
            
            if(e.key=== 'e'){
            var ball = document.createElement('a-entity')
            ball.setAttribute('gltf-model', './models/bowling_ball/scene.gltf')
            ball.setAttribute('scale', {x: 0.6, y: 0.6, z: 0.6})
            ball.setAttribute('id', 'ball')
            ball.setAttribute('geometry',{
                primitive : 'sphere',
                radius : 1
            })
            var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        ball.setAttribute('dynamic-body', {shape : 'sphere', mass : '0.3'})

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-15));

        var scene = document.querySelector("#scene");
        scene.addEventListener('collide', this.removeBall)

        scene.appendChild(ball);
            }
        })
    },
    removeBall : function(e){
        // console.log(e.detail.body.el)

        var elementHit = e.detail.body.el
        var element = e.detail.target.el

        if(elementHit.id.includes('pin') && element.id.includes('ball')){
            console.log(element)
            elementHit.setAttribute('material', {opacity : 0.5, transparent :'true'})
            
            var impulse = new CANNON.Vec3(0, -1, -25)
            var WorldPoint = new CANNON.Vec3().copy(elementHit.getAttribute('position'))
            elementHit.body.applyImpulse(impulse, WorldPoint)

            element.removeEventListener('collide', this.throw)

            var scene = document.querySelector('#scene')
            scene.removeChild(element)
        }
    }
})