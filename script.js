	// 映射表部分
	// 呵呵啊哈哈哈哈
	const hashToUrlMap = {
	  "669f4259d89b0af04c928b79dffba61b31b5779b95f55caabd716f75b7d9d842": "https://s.nobook.com/index.html?id=205866", //炸掉一切！
	  "3c29fc3464377a28ffe2a7713f1a081cebf617f8e11dcd90f3b46df6d04636e1": "https://s.nobook.com/index.html?id=205871", //美味果汁
	  "3121771b9c5973e0f089fc009419975232f6f374f1f95a118e8259c98dd5ded4": "https://b23.tv/7g5kA8S", //剧场！
	  "c06b0cfe0cc5e900c57784484094331f095bf441995c3c31ea6c75691c786c35": "https://s.nobook.com/index.html?id=206204", //玫瑰
	  "a9f74d1ec36ebdeb2da3f6e5868090cd2a2d20b3dcca7b62f60304b1d3d9ef42": "https://s.nobook.com/index.html?id=206345", //茶叶！
	  "a28e9c6746ac69b8b714d9ea569a29f7c203d7ff7abcdc3e3dc97267beec5a43": "https://s.nobook.com/index.html?id=207847", //多功能机器！
	  "df3041cf9a7e98ba49a1c89d94fb39d6215f1559e088de5cc90dab2bb4ac6592": "https://pipetrainingcamp.github.io/index.html", //GoodPTC的网站！
	  "77d87b0061d4094d1c654a07a04a3d312076f385cb69f140de5073160a305c34": "https://s.nobook.com/index.html?id=208948", //泡泡机！
 	 "cff97e03e7e93cd2a84a27ce90f1c9397507f017db5025a711994efafa59aaea": "https://s.nobook.com/index.html?id=213187", //变色花！
	  "a8ad3b6efa922d27bbd55c811474757e98f0aeb7ef2ba4f9e0f34f3ffce2af75": "https://s.nobook.com/index.html?id=234906", //高压放电装置！
	  "4f80dfb8ba2f5269f9381109b6a635f25831ecb660a8579bda06be899a51a7bf": "https://s.nobook.com/index.html?id=250007", //铝箔纸！
	  // 可继续添加更多 "hash": "url"
	};

	function verifyCode() {
	  const input = document.getElementById("codeInput").value.trim();
	  const resultEl = document.getElementById("result");
	  const jumpContainer = document.getElementById("jumpContainer");
	  const jumpButton = document.getElementById("jumpButton");
	
	  // 重置状态
	  jumpContainer.style.display = "none";
	  resultEl.innerText = "";
	  resultEl.style.color = "";
	
	  if (!input) {
		resultEl.innerText = "⚠️ 你没有输入任何兑换码";
		resultEl.style.color = "orange";
		return;
	  }
	  
	  // 计算 SHA256 哈希（小写十六进制）
	  const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
	
	  if (hash in hashToUrlMap) {
		const action = hashToUrlMap[hash];
	
		// 检查是否为增加Lemon币的操作
		if (action.startsWith("ADD_COINS_")) {
		  const coinsToAdd = parseInt(action.replace("ADD_COINS_", ""), 10);
	
		  if (
			!isNaN(coinsToAdd) &&
			window.virtualCoinsManager &&
			typeof window.virtualCoinsManager.addCoins === 'function'
		  ) {
			// 调用增加虚拟币
			const success = window.virtualCoinsManager.addCoins(coinsToAdd);
			if (success) {
			  resultEl.innerText = `✅ 兑换成功！获得了 ${coinsToAdd} 个 Lemon币！`;
			  resultEl.style.color = "green";
			  document.getElementById("codeInput").value = ""; // 清空输入框
			} else {
			  resultEl.innerText = "❌ 兑换失败，请重试";
			  resultEl.style.color = "red";
			}
		  } else {
			resultEl.innerText = "❌ 虚拟币系统未就绪";
			resultEl.style.color = "red";
		  }
		} else {
		  // 原有跳转逻辑
		  resultEl.innerText = "✅ 输对了！点击下方按钮跳转";
		  resultEl.style.color = "green";
		  jumpButton.href = action;
		  jumpContainer.style.display = "block";
		}
	  } else {
		resultEl.innerText = "❌ 兑换码无效";
		resultEl.style.color = "red";
	  }
	}

	// 支持回车提交
	document.getElementById("codeInput").addEventListener("keypress", function(e) {
	  if (e.key === "Enter") {
		verifyCode();
	  }
	});
	
	// 清空的函数
	function clearCode() {
	  const input = document.getElementById("codeInput");
	  const resultEl = document.getElementById("result");
	  const jumpContainer = document.getElementById("jumpContainer");
	  input.value = "";
	  resultEl.innerText = "";
	  resultEl.style.color = "";
	  jumpContainer.style.display = "none";
	  input.focus();
	}