// Reuse the published, self-contained project snapshots as an interactive demo.
// Only sessionStorage receives business changes. There is no shared write API.
(async()=>{
 const projects=[{id:'missouri',name:'Missouri'},{id:'new-hampshire',name:'New Hampshire'}];
 const requested=new URLSearchParams(location.search).get('project');
 let remembered='';try{remembered=localStorage.getItem('payit-published-selected-project');}catch{}
 const project=projects.some(p=>p.id===requested)?requested:projects.some(p=>p.id===remembered)?remembered:'missouri';
 const releaseResponse=await fetch('workspace-release.json?v=workspace-48',{cache:'no-cache'});if(!releaseResponse.ok)throw Error('Workspace update could not load.');
 const release=await releaseResponse.json();
 const unpack=async text=>{const bytes=Uint8Array.from(atob(text),c=>c.charCodeAt(0));return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();};
 const response=await fetch(project+'.html',{cache:'no-cache'});if(!response.ok)throw Error('Project snapshot could not load.');
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');
 const script=doc.querySelector('script[type="module"]');if(!script)throw Error('Project application was not found.');
 const update=release.projects[project];if(!update)throw Error('Project update could not load.');
 let code=await unpack(update.code);
 const dataNode=doc.getElementById('workspace-data'),data=JSON.parse(dataNode.textContent);data.configurationUIInventory=JSON.parse(await unpack(release.configurationInventory));dataNode.textContent=JSON.stringify(data).replaceAll('<','\\u003c');
 doc.getElementById('published-state').textContent=JSON.stringify(update.snapshot).replaceAll('<','\\u003c');
 const baseStyle=doc.head.querySelector('style');if(baseStyle)baseStyle.textContent=release.styles;
 code=code.replace(/let projectChoices=\[[^;]*;/,'let projectChoices='+JSON.stringify(projects)+';');
 const switchStart=code.indexOf('async function switchProject(id){'),switchEnd=code.indexOf('const escape=',switchStart);
 if(switchStart<0||switchEnd<0)throw Error('Project navigation could not initialize.');
 code=code.slice(0,switchStart)+`async function switchProject(id){
  if(id===PROJECT_ID||!projectChoices.some(p=>p.id===id))return;
  try{localStorage.setItem('payit-published-selected-project',id);}catch{}
  location.href='index.html?project='+encodeURIComponent(id)+'#delivery';
 }\n\n`+code.slice(switchEnd);
 const original='function cacheState(){return true;}\nfunction persist(){}';
 if(!code.includes(original))throw Error('Demo storage could not initialize.');
 code=code.replace(original,`function cacheState(){
  try{sessionStorage.setItem('payit-poc-session:'+PROJECT_ID,JSON.stringify({revision:serverRevision,state}));return true;}catch{return false;}
 }
 function persist(){const saved=cacheState();$('#save-note').textContent=saved?'Demo changes saved in this tab only':'Session storage unavailable: changes will not survive reload';if(!saved)notify('Session storage is unavailable. Changes will last only until reload.');}`);
 const seed='state={...state,...saved.state};serverRevision=saved.revision;';
 if(!code.includes(seed))throw Error('Published records could not initialize.');
 code=code.replace(seed,seed+`try{const local=JSON.parse(sessionStorage.getItem('payit-poc-session:'+PROJECT_ID));if(local&&local.revision===serverRevision)state={...state,...local.state};}catch{}`);
 code=code.replace("window.PUBLISHED_NOTE='Read-only · published '","window.PUBLISHED_NOTE='Demo session · source published '");
 code=code.replace("function storageLabel(){return 'Published read-only snapshot. Updates are managed by the workspace owner.';}","function storageLabel(){return 'Demo changes are saved only in this tab’s session, separately for each project. They do not update the owner’s workspace or other users.';}");
 // These screens need an actual server/connection. All business record editors
 // and package setup actions operate on the isolated browser session instead.
 code=code.replaceAll("['jira-sync','storage','project-setup','baselines']","['jira-sync','project-setup']");
 code=code.replaceAll("['project-setup','jira-sync','baselines','storage']","['project-setup','jira-sync']");
 code=code.replace('Published details are shown below. Changes are managed by the workspace owner.','Try editing the fields below. Saved changes stay in this tab’s demo session.');
 code=code.replace('Open an item to view its setup instructions and recorded progress. Changes are managed by the workspace owner.','Open an item to view or edit setup details, or update its progress. Changes stay in this tab’s demo session.');
 code=code.replace('Review the configuration checklist and recorded validation.','Try setup, configuration changes and validation in your own demo session.');
 if(!code.includes('const configurationJourney=createConfigurationJourney(')){
  code="import {createConfigurationJourney} from './configuration-journey.js?v=journey-layout-42';\n"+code;
  code=code.replace('const navs=[',"const navs=[['configuration-journey','↗','Configuration Journey',''],");
  code=code.replace("pages:['configuration','configuration-areas','development-delivery','migration']","pages:['configuration-journey','configuration','configuration-areas','development-delivery','migration']");
  code=code.replace('const raid=createRaid(',"const configurationJourney=createConfigurationJourney({getData:()=>data,getState:()=>state,delivery,html,head,pill,download,persist,openDetail,content:markup=>$('#content').innerHTML=markup});\nconst raid=createRaid(");
  code=code.replace("if(current==='configuration'){","if(current==='configuration-journey'){configurationJourney.view();return;}if(current==='configuration'){");
 }
 script.textContent=code;
 for(const item of [...doc.querySelectorAll('script:not([type])')])if(item.textContent.includes('This static viewer has no server'))item.remove();
 const banner=doc.querySelector('.publication-banner');
 banner.textContent='Interactive Demo · Changes stay in this tab’s browser session and survive refresh. They are not shared. Jira sync is owner-managed. ';
 const reset=doc.createElement('button');reset.id='poc-reset-session';reset.type='button';reset.textContent='Reset My Changes';banner.append(reset);
 const sidebar=doc.querySelector('.sidebar-bottom');if(sidebar){sidebar.childNodes.forEach(n=>{if(n.nodeType===3)n.textContent=n.textContent.replace('Published Snapshot','Demo Session');});sidebar.querySelector('div').textContent='Changes stay in this tab only';}
 const avatar=doc.querySelector('.avatar');if(avatar){avatar.textContent='DEMO';avatar.title='Your isolated demo session';}
 const style=doc.createElement('style');style.textContent='form button[type=submit],#backup,.import-label{display:revert!important}#jira-sync-now{display:none!important}.publication-banner{line-height:1.5;padding:6px 12px}.publication-banner button{font:inherit;padding:2px 8px;margin-left:8px;border:1px solid #fff;border-radius:5px;background:transparent;color:#fff;cursor:pointer}.avatar{font-size:9px}.publication-banner{position:sticky;top:0}.app{padding-top:0}.sidebar{top:48px;height:calc(100vh - 48px)}';doc.head.append(style);
 const hooks=doc.createElement('script');hooks.textContent=`
 document.addEventListener('click',e=>{if(e.target.id==='poc-reset-session'){const id=${JSON.stringify(project)};sessionStorage.removeItem('payit-poc-session:'+id);location.reload();}},true);
 document.querySelector('#jira-sync-now').hidden=true;
 const hideOwnerLinks=()=>document.querySelectorAll('a[href="#jira-sync"],a[href="#project-setup"]').forEach(a=>a.hidden=true);
 new MutationObserver(hideOwnerLinks).observe(document.body,{childList:true,subtree:true});hideOwnerLinks();
 const label=document.querySelector('#save-note');label.textContent='Your demo session · changes are not shared';
 `;doc.body.insertBefore(hooks,script);
 document.open();document.write('<!doctype html>'+doc.documentElement.outerHTML);document.close();
})().catch(error=>{document.querySelector('#opening-status').textContent=error.message+' Refresh to try again.';});
