var mysub = "programmerhumor";

function inject_vthread()
{
	Array.from(document.querySelectorAll("label input[type='checkbox']")).map(function(x){
		x.disabled = true;
	})
	var oid = window.location.toString().split("ledditize-")[1];
	var ctd = [];
	function f(z)
	{
		if(Array.isArray(z))
		{
			for(var zz of z)
			{
				f(zz);
			}
		}
		else if(typeof z === "object")
		{
			var tmp = {};
			for(var i in z)
			{
				var zz = ["body","id","author","parent_id","created_utc","selftext","url","thumbnail","title"];
				for(var zzz of zz)
				{
					if(z.hasOwnProperty(zzz))
					{
						tmp[zzz] = z[zzz];
					}
				}
				f(z[i]);
			}

			if(JSON.stringify(tmp)!=JSON.stringify({}))
			{
				ctd.push(tmp);
			}
		}
		else
		{

		}
	}

	function datec(x)
	{
		var ret = (x.getMonth()+1)+"/"+x.getDate()+"/"+(x.getFullYear()%2000)+"("+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][x.getDay()]+") "+x.getHours().toString().padStart(2,'0')+":"+x.getMinutes().toString().padStart(2,'0')+":"+x.getSeconds().toString().padStart(2,'0');
		return ret;
	}

	var temp_original ='<div class="postContainer opContainer" id="pc$ORIGINAL$">	<div id="p$ORIGINAL$" class="post op">		<div class="file" id="f$ORIGINAL$">			<div class="fileText" id="fT$ORIGINAL$">File: 				<a href="$IMAGE_LINK" target="_blank">$FILENAME</a> $FILEINFO			</div>			<a class="fileThumb" href="$IMAGE_LINK" target="_blank">				<img src="$THUMBNAIL_LINK">			</div>		</a>	</div>	<div class="postInfo desktop" id="pi$ORIGINAL$">		<input type="checkbox" name="$ORIGINAL$" value="delete"> 		<span class="subject"></span> 		<span class="nameBlock">			<span class="name">$LEDDIT_USERNAME</span>		</span> 		<span class="dateTime" data-utc="$UTC_TIME">$UTC_TO_LOCAL</span> 		<span class="postNum desktop">			<span>No. $ORIGINAL$</span>		</span>		<a href="#" class="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a>		<div id="bl_$ORIGINAL$" class="backlink">			<span>				<a href="#p$REPLY$" class="quotelink">&gt;&gt;$REPLY$</a> 			</span>		</div>	</div>	<blockquote class="postMessage" id="m$ORIGINAL$">		$FORMATTED_TEXT	</blockquote>	</div></div>';
	var temp_reply = '<div class="postContainer replyContainer" id="pc$TX_ID$">	<div class="sideArrows" id="sa$TX_ID$">&gt;&gt;</div>	<div id="p$TX_ID$" class="post reply">		<div class="postInfo desktop" id="pi$TX_ID$"><input type="checkbox" name="$TX_ID$" value="delete"> 			<span class="nameBlock">				<span class="name">$LEDDIT_USERNAME</span> 			</span> 			<span class="dateTime" data-utc="$UTC_DATA">$UTC_TO_LOCAL</span> 			<span class="postNum desktop">				<a href="#p$TX_ID$" title="Link to this post">No.</a>				<a href="javascript:quote("$TX_ID$")" title="Reply to this post">$TX_ID$</a>			</span>			<a href="#" class="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a><div id="bl_$ORIGINAL$" class="backlink"></div>		</div>		<blockquote class="postMessage" id="m$TX_ID$">			$FORMATTED_TEXT		</blockquote> 	</div></div>'
	var q = cuthere;
	f(q);
	function dcmp(ta,tb)
	{
		if(ta["created_utc"]<tb["created_utc"])
		{
			return -1;
		}
		if(ta["created_utc"]>tb["created_utc"])
		{
			return 1;
		}
		return 0;		
	}
	ctd = ctd.filter(function(x){
		return x["created_utc"];
	})
	ctd.sort(dcmp);
	ctd.map(function(x)
	{
		if(x.hasOwnProperty("parent_id") && x["parent_id"].indexOf("_")!==-1)
		{
			x["parent_id"] = x["parent_id"].split("_")[1];
		}
	});

	function opconstruct(x)
	{
		var datestr = datec(new Date(x["created_utc"]*1000));

		if(!x["thumbnail"])
		{
			x["thumbnail"] = "https://www.redditstatic.com/new-icon.png";
		}
		var ret = temp_original.replace(/\$ORIGINAL\$/g,x["id"]).replace(/\$UTC_TO_LOCAL/g,datestr).replace(/\$LEDDIT_USERNAME/,x["author"]).replace("$FORMATTED_TEXT",(x["selftext"]?x["selftext"]:"") + x["title"]);
		document.querySelector("title").innerHTML = x["title"] + "- ledditized 4ch";
		if(x["url"] && x["url"].match(/(.+)\.((jpe*g)|(png)|(gifv*))/i))
		{
			var xfn = x["url"].split("/");
			xfn = xfn[xfn.length-1];
			ret = ret.replace(/\$IMAGE_LINK/g,x["url"]).replace(/\$THUMBNAIL_LINK/g,x["thumbnail"]).replace("$FILENAME",xfn).replace("$FILEINFO","");
		}
		else
		{
			ret.replace(/\$IMAGE_LINK/g,"https://www.redditstatic.com/new-icon.png").replace(/\$THUMBNAIL_LINK/g,x["thumbnail"]).replace("$FILEINFO","").replace("$FILENAME","new-icon.png");
			ret.replace("$FORMATTED_TEXT",x["url"]);
		}
		var tmp = document.createElement("div");
		tmp.innerHTML = ret;
		tmp.querySelector(".backlink").innerHTML = "";
		tmp.querySelector(".backlink").style.overflow = "hidden";	

		var flist = ctd.filter(function(z){
			return (z.hasOwnProperty("parent_id") && z["parent_id"] === x["id"]);
		}).map(function(z){
			return z["id"];
		});

		for(var z of flist)
		{
			var w = document.createElement("a");
			w.setAttribute("class","quotelink");
			w.innerHTML = ">>"+z;
			var zz = document.createElement("span");
			zz.appendChild(w);
			zz.style.paddingRight = "5px";
			tmp.querySelector(".backlink").appendChild(zz);
		}
		ret = tmp.innerHTML;
		return ret;
	}
	function ftconstruct(x)
	{
		var w = document.createElement("div");
		var y = document.createElement("a");
		y.innerHTML = ">>"+x["parent_id"];
		y.setAttribute("class","quotelink");
		w.appendChild(y);
		w.appendChild(document.createElement("br"));
		w.appendChild(document.createTextNode(x["body"]));
		return w.innerHTML;
	}
	function replyconstruct(x)
	{
		var datestr = datec(new Date(x["created_utc"]*1000));
		var ret = temp_reply.replace(/\$TX_ID\$/g,x["id"]).replace("$LEDDIT_USERNAME",x["author"]).replace("$UTC_TO_LOCAL",datestr).replace("$FORMATTED_TEXT",ftconstruct(x));
		var tmp = document.createElement("div");
		tmp.innerHTML = ret;
		tmp.querySelector(".backlink").innerHTML = "";
		tmp.querySelector(".backlink").style.overflow = "hidden";	

		var flist = ctd.filter(function(z){
			return (z.hasOwnProperty("parent_id") && z["parent_id"] === x["id"]);
		}).map(function(z){
			return z["id"];
		});

		for(var z of flist)
		{
			var w = document.createElement("a");
			w.setAttribute("class","quotelink");
			w.innerHTML = ">>"+z;
			var zz = document.createElement("span");
			zz.appendChild(w);
			zz.style.paddingRight = "5px";
			tmp.querySelector(".backlink").appendChild(zz);
		}
		ret = tmp.innerHTML;
		return ret;
	}

	var opost = ctd.filter(function(x){
		return (x["id"]===oid);
	})[0];
	if(!document.querySelector("#pc"+oid))
	{
		document.querySelector(".thread").innerHTML = opconstruct(opost);
	}
	//alert(JSON.stringify(ctd));	
	for(var z of ctd)
	{
		if(!document.querySelector("#pc"+z["id"]))
		{
			if(z["body"]!==null && z["body"]!==undefined)
			{
				document.querySelector(".thread").innerHTML += replyconstruct(z);
			}
		}
	}
	document.querySelector("div.file img").onclick = function(){
		var x = document.createElement("img");
		x.setAttribute("src",this.parentNode.href);
		this.parentNode.appendChild(x);
		this.parentNode.removeChild(this);
	}
	document.querySelector("body > div.navLinks.desktop > a:nth-child(5)").setAttribute("disabled","true");
	document.querySelectorAll(".navLinksBot a")[4].setAttribute("disabled","true");

}

function injected_script()
{
/*	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			alert(JSON.stringify(request));
			alert(JSON.stringify(sender));
			alert(sendResponse);
	});*/
	var qbx = document.createElement("a");
	qbx.id = "ledditize-cbutton";
	var csub = "programmerhumor";
	if(localStorage.getItem("ledditize-mysub")!==null)
	{
		csub = localStorage.getItem("ledditize-mysub");
	}
	chrome.runtime.sendMessage("ext_id","mysub:"+csub);

	qbx.innerHTML = "select subreddit, current: "+csub;
	qbx.onclick = function(){
		Array.from(document.querySelectorAll(".thread")).map(function(x){
			if(x.id.indexOf("ledditize")!==-1)
			{
				x.parentNode.removeChild(x);
			}
		});		

		var csubnew = prompt("new subreddit",csub);
		if(csub.match(/^[A-Za-z0-9_]+$/))
		{
			localStorage.setItem("ledditize-mysub",csubnew);
			chrome.runtime.sendMessage("ext_id","mysub:"+csubnew);
			window.location.reload();
		}
		else
		{
			alert("error: illegal character in subreddit name");
		}
	}
	if(!document.querySelector("#ledditize-cbutton"))
	{
		document.querySelector(".navLinks").appendChild(qbx);
	}
	else
	{
		document.querySelector("#ledditize-cbutton").innerHTML = qbx.innerHTML;
	}
	var q = cuthere;
	var x = q["data"]["children"];
	for(var i of x)
	{
		var xtitle = i["data"]["title"], xperma = i["data"]["permalink"], xurl = i["data"]["url"], xdocatalog = i["data"]["docatalog"], xthumb = i["data"]["thumbnail"],xid = i["data"]["id"];
		if(document.querySelector("#ledditize-"+xid))
		{
			continue;
		}
		var odiv = document.createElement("div");
		odiv.setAttribute("class","thread");
		odiv.setAttribute("id","ledditize-"+xid);

		var oa = document.createElement("a");
		oa.setAttribute("xid",xid);
		/*console.log(xid);
		console.log(document.querySelectorAll(".thread a")[2].href.toString()+("#ledditize-"+xid));*/
		oa.onclick = function(evt)
		{
			window.location.assign(document.querySelectorAll(".thread a")[2].href.toString()+("#ledditize-"+this.getAttribute("xid")));
		}

		//oa.setAttribute("href",xurl);

		var oimg = document.createElement("img");
		oimg.setAttribute("class","thumb");
		if((xthumb === "") || (xthumb === "self"))
		{
			oimg.setAttribute("src","https://www.redditstatic.com/new-icon.png");
		oimg.setAttribute("width","150");
		oimg.setAttribute("height","150");
		}
		else
		{
			oimg.setAttribute("src",xthumb);
		}
		/*oimg.setAttribute("width","150");
		oimg.setAttribute("height","150");*/

		var mdiv = document.createElement("div");
		mdiv.setAttribute("class","meta");
		mdiv.innerHTML = "R: <b>"+i["data"]["num_comments"]+"</b>"
		var mbrlink = document.createElement("a");
		mbrlink.setAttribute("class","postMenuBtn");
		mbrlink.setAttribute("href",xurl);
		mbrlink.innerHTML = "▶";
		mdiv.appendChild(mbrlink);
		var tdiv = document.createElement("div");
		tdiv.setAttribute("class","teaser");
		tdiv.innerText = xtitle;

		oa.appendChild(oimg);
		odiv.appendChild(oa);
		odiv.appendChild(mdiv);
		odiv.appendChild(tdiv);
		var tlist = document.querySelectorAll(".thread");
		document.querySelector("#threads").appendChild(odiv);
	}
}

function ledditize_vthread(xid)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://api.reddit.com/r/"+mysub+"/comments/"+xid);
	xhr.onreadystatechange = function()
	{
		if(this.readyState===4)
		{
			chrome.tabs.executeScript({
				code: "("+inject_vthread.toString().replace("cuthere",this.responseText)+")();"
			});
		}
	}
	xhr.send();
}

function ledditize_injection()
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://api.reddit.com/r/"+mysub);
	xhr.onreadystatechange = function()
	{
		if(this.readyState===4)
		{
			chrome.tabs.executeScript({
				code: "("+injected_script.toString().replace(/ext_id/g,chrome.runtime.id).replace("cuthere",this.responseText)+")();"
			});
		}
	}
	xhr.send();
}
function lvthread()
{
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0].url.match(/4chan\.org\/g\/thread\/\w+#ledditize-(.+)/i))
		{
			ledditize_vthread(tabs[0].url.match(/4chan\.org\/g\/thread\/\w+#ledditize-(.+)/)[1]);
		}
	});
}
function catalog()
{
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0].url.match(/4chan\.org\/g\/catalog/i))
		{
			//chrome.tabs.sendMessage(tabs[0].id,{"hi":"hello"});

			ledditize_injection();
		}
	});
}
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//console.log(request);
		if(request.toString().match(/mysub\:(.+)/))
		{
			mysub = request.toString().replace("mysub:","");
		}
});
setInterval(lvthread,5000);
setInterval(catalog,5000);