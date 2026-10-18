import{i as e}from"./rolldown-runtime-COiEfhsA.js";import{E as t,x as n}from"./index-Cnv9Ltx0.js";import{A as r,F as i,I as a,L as o,N as s,P as c,S as l,_ as u,d,f,g as p,h as m,k as h,l as g,m as _,n as v,o as y,r as b,t as x,u as S,x as C,y as w}from"./OrbitControls-DpFYQl4T.js";import{t as T}from"./Text-CxFnFsRP.js";var E=parseInt(`186`.replace(/\D+/g,``)),D=E>=125?`uv1`:`uv2`,O=new S,k=new i,A=class extends _{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new f([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new f([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new m(t,6,1);return this.setAttribute(`instanceStart`,new p(n,3,0)),this.setAttribute(`instanceEnd`,new p(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new m(n,t*2,1);return this.setAttribute(`instanceColorStart`,new p(r,t,0)),this.setAttribute(`instanceColorEnd`,new p(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new o(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new S);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),O.setFromBufferAttribute(t),this.boundingBox.union(O))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new r),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)k.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(k)),k.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(k));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}},j=class extends A{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(t===3)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},M=class extends h{constructor(e){super({type:`LineMaterial`,uniforms:s.clone(s.merge([g.common,g.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new c(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${E>=154?`colorspace_fragment`:`encodings_fragment`}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA=`1`:delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return`WORLD_UNITS`in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return`USE_DASH`in this.defines},set(e){!!e!=`USE_DASH`in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return`USE_ALPHA_TO_COVERAGE`in this.defines},set:function(e){!!e!=`USE_ALPHA_TO_COVERAGE`in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}},N=new a,P=new i,F=new i,I=new a,L=new a,R=new a,z=new i,B=new C,V=new u,H=new i,U=new S,W=new r,G=new a,K,q;function J(e,t,n){return G.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),G.multiplyScalar(1/G.w),G.x=q/n.width,G.y=q/n.height,G.applyMatrix4(e.projectionMatrixInverse),G.multiplyScalar(1/G.w),Math.abs(Math.max(G.x,G.y))}function Y(e,t){let n=e.matrixWorld,r=e.geometry,a=r.attributes.instanceStart,o=r.attributes.instanceEnd,s=Math.min(r.instanceCount,a.count);for(let r=0,c=s;r<c;r++){V.start.fromBufferAttribute(a,r),V.end.fromBufferAttribute(o,r),V.applyMatrix4(n);let s=new i,c=new i;K.distanceSqToSegment(V.start,V.end,c,s),c.distanceTo(s)<q*.5&&t.push({point:c,pointOnLine:s,distance:K.origin.distanceTo(c),object:e,face:null,faceIndex:r,uv:null,[D]:null})}}function X(e,t,n){let r=t.projectionMatrix,a=e.material.resolution,o=e.matrixWorld,s=e.geometry,c=s.attributes.instanceStart,l=s.attributes.instanceEnd,u=Math.min(s.instanceCount,c.count),d=-t.near;K.at(1,R),R.w=1,R.applyMatrix4(t.matrixWorldInverse),R.applyMatrix4(r),R.multiplyScalar(1/R.w),R.x*=a.x/2,R.y*=a.y/2,R.z=0,z.copy(R),B.multiplyMatrices(t.matrixWorldInverse,o);for(let t=0,s=u;t<s;t++){if(I.fromBufferAttribute(c,t),L.fromBufferAttribute(l,t),I.w=1,L.w=1,I.applyMatrix4(B),L.applyMatrix4(B),I.z>d&&L.z>d)continue;if(I.z>d){let e=I.z-L.z,t=(I.z-d)/e;I.lerp(L,t)}else if(L.z>d){let e=L.z-I.z,t=(L.z-d)/e;L.lerp(I,t)}I.applyMatrix4(r),L.applyMatrix4(r),I.multiplyScalar(1/I.w),L.multiplyScalar(1/L.w),I.x*=a.x/2,I.y*=a.y/2,L.x*=a.x/2,L.y*=a.y/2,V.start.copy(I),V.start.z=0,V.end.copy(L),V.end.z=0;let s=V.closestPointToPointParameter(z,!0);V.at(s,H);let u=w.lerp(I.z,L.z,s),f=u>=-1&&u<=1,p=z.distanceTo(H)<q*.5;if(f&&p){V.start.fromBufferAttribute(c,t),V.end.fromBufferAttribute(l,t),V.start.applyMatrix4(o),V.end.applyMatrix4(o);let r=new i,a=new i;K.distanceSqToSegment(V.start,V.end,a,r),n.push({point:a,pointOnLine:r,distance:K.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[D]:null})}}}var Z=class extends l{constructor(e=new A,t=new M({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)P.fromBufferAttribute(t,e),F.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+P.distanceTo(F);let i=new m(r,2,1);return e.setAttribute(`instanceDistanceStart`,new p(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new p(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;K=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;q=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),W.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?q*.5:J(r,Math.max(r.near,W.distanceToPoint(K.origin)),s.resolution),W.radius+=c,K.intersectsSphere(W)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),U.copy(o.boundingBox).applyMatrix4(a);let l;l=n?q*.5:J(r,Math.max(r.near,U.distanceToPoint(K.origin)),s.resolution),U.expandByScalar(l),K.intersectsBox(U)!==!1&&(n?Y(this,t):X(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(N),this.material.uniforms.resolution.value.set(N.z,N.w))}},ee=class extends Z{constructor(e=new j,t=new M({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},Q=e(t()),te=Q.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:r,lineWidth:o,segments:s,dashed:l,...u},f){var p;let m=y(e=>e.size),h=Q.useMemo(()=>s?new Z:new ee,[s]),[g]=Q.useState(()=>new M),_=(n==null||(p=n[0])==null?void 0:p.length)===4?4:3,b=Q.useMemo(()=>{let r=s?new A:new j,o=e.map(e=>{let t=Array.isArray(e);return e instanceof i||e instanceof a?[e.x,e.y,e.z]:e instanceof c?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e});if(r.setPositions(o.flat()),n){t=16777215;let e=n.map(e=>e instanceof d?e.toArray():e);r.setColors(e.flat(),_)}return r},[e,s,n,_]);return Q.useLayoutEffect(()=>{h.computeLineDistances()},[e,h]),Q.useLayoutEffect(()=>{l?g.defines.USE_DASH=``:delete g.defines.USE_DASH,g.needsUpdate=!0},[l,g]),Q.useEffect(()=>()=>{b.dispose(),g.dispose()},[b]),Q.createElement(`primitive`,v({object:h,ref:f},u),Q.createElement(`primitive`,{object:b,attach:`geometry`}),Q.createElement(`primitive`,v({object:g,attach:`material`,color:t,vertexColors:!!n,resolution:[m.width,m.height],linewidth:r??o??1,dashed:l,transparent:_===4},u)))}),$=n(),ne=()=>{let[e,t]=(0,Q.useState)(null),n=[{id:0,name:`Agent Tiếp Nhận`,role:`Phân tích yêu cầu khách hàng & dữ liệu thô`,pos:[-4,2,0],color:`#38BDF8`},{id:1,name:`Agent Kiến Trúc`,role:`Thiết kế mặt bằng & phân khu công năng`,pos:[-2,4,1],color:`#38BDF8`},{id:2,name:`Agent 3D Blender`,role:`Dựng khối 3D tham số từ JSON`,pos:[2,4,1],color:`#38BDF8`},{id:3,name:`Agent Kỹ Thuật CAD`,role:`Sinh mã AutoLISP triển khai chi tiết`,pos:[4,2,0],color:`#38BDF8`},{id:4,name:`Agent Bóc Khối Lượng`,role:`Đo bóc khối lượng bê tông/thép & lập BOQ`,pos:[3,-2,0],color:`#38BDF8`},{id:5,name:`Agent Thẩm Định QA/QC`,role:`Đối soát tiêu chuẩn PCCC và quy chuẩn`,pos:[-3,-2,0],color:`#38BDF8`}],r={name:`KỸ SƯ TRƯỞNG (HITL)`,role:`Quyền phê duyệt tối cao và chỉ đạo các Agent`,pos:[0,0,0],color:`#F26B1D`};return(0,$.jsxs)(`div`,{className:`space-y-4`,children:[(0,$.jsx)(`div`,{className:`p-3 bg-[#0B1E33] border border-[#1C3B5E] rounded-lg text-xs font-mono text-white flex items-center justify-between`,children:(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:`text-[#F26B1D] font-bold`,children:`MẠNG LƯỚI 6 AI AGENT: `}),(0,$.jsx)(`span`,{children:`Kiến trúc phân tán với Kỹ sư trưởng (HITL) ở vị trí trung tâm điều phối`})]})}),(0,$.jsxs)(`div`,{className:`relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]`,children:[(0,$.jsxs)(b,{camera:{position:[0,0,11],fov:45},frameloop:`demand`,children:[(0,$.jsx)(`ambientLight`,{intensity:.9}),(0,$.jsx)(`directionalLight`,{position:[5,10,5],intensity:1.5}),(0,$.jsx)(`color`,{attach:`background`,args:[`#081524`]}),(0,$.jsxs)(`group`,{position:r.pos,onClick:()=>t(-1),children:[(0,$.jsxs)(`mesh`,{children:[(0,$.jsx)(`sphereGeometry`,{args:[1,32,32]}),(0,$.jsx)(`meshStandardMaterial`,{color:r.color,roughness:.3})]}),(0,$.jsx)(T,{position:[0,-1.4,0],fontSize:.25,color:`#F26B1D`,anchorX:`center`,anchorY:`middle`,children:`HITL CONTROLLER`})]}),n.map(n=>{let r=e===n.id;return(0,$.jsxs)(`group`,{position:n.pos,onClick:()=>t(n.id),children:[(0,$.jsxs)(`mesh`,{children:[(0,$.jsx)(`sphereGeometry`,{args:[.6,24,24]}),(0,$.jsx)(`meshStandardMaterial`,{color:r?`#F26B1D`:n.color,emissive:r?`#F26B1D`:`#000000`,emissiveIntensity:r?.4:0})]}),(0,$.jsx)(T,{position:[0,-.9,0],fontSize:.2,color:`#FFFFFF`,anchorX:`center`,anchorY:`middle`,children:n.name}),(0,$.jsx)(te,{points:[[0,0,0],[-n.pos[0],-n.pos[1],-n.pos[2]]],color:`#1C3B5E`,lineWidth:1.5})]},n.id)}),(0,$.jsx)(x,{maxPolarAngle:Math.PI/2,minDistance:6,maxDistance:20})]}),(0,$.jsx)(`div`,{className:`absolute bottom-4 left-4 right-4 bg-[#0B1E33]/90 border border-[#1C3B5E] p-3 rounded text-xs font-mono text-white backdrop-blur-md`,children:e===-1?(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`div`,{className:`text-[#F26B1D] font-bold text-sm mb-1`,children:r.name}),(0,$.jsx)(`div`,{className:`text-gray-300 font-sans`,children:r.role})]}):e===null?(0,$.jsx)(`div`,{className:`text-gray-400 italic`,children:`* Click vào bất kỳ Node nào trên đồ thị 3D để xem chức năng và thẩm quyền trong mạng lưới.`}):(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`div`,{className:`text-[#38BDF8] font-bold text-sm mb-1`,children:n[e].name}),(0,$.jsx)(`div`,{className:`text-gray-300 font-sans`,children:n[e].role})]})})]})]})};export{ne as OverviewAgentsNetworkScene};