// ================
// Form Data Object
// ================

// Which User Will choose
const formData = {
    user: {
      name: "",
      email: "",
      tel: "",
    },
    plan: "arcade",
    add_ons: {
      online_service: true,
      larger_storage: true,
      customizable_profile: false,
    },
  },
  priceData = {
    plans: {
      arcade: {
        monthly: [9, "$9/mo"],
        yearly: [90, "$90/yr"],
      },
      advanced: {
        monthly: [12, "$12/mo"],
        yearly: [120, "$120/yr"],
      },
      pro: {
        monthly: [15, "$15/mo"],
        yearly: [150, "$150/yr"],
      },
    },
    add_ons: {
      online_service: {
        monthly: [1, "$1/mo"],
        yearly: [10, "$10/yr"],
      },
      larger_storage: {
        monthly: [2, "$2/mo"],
        yearly: [20, "$20/yr"],
      },
      customizable_profile: {
        monthly: [2, "$2/mo"],
        yearly: [20, "$20/yr"],
      },
    },
  };
let payType = "monthly";

// =================
// Step-1 Validation
// =================

const inputs = {
  user_name: document.getElementById("user-name"),
  user_email: document.getElementById("user-email"),
  user_tel: document.getElementById("user-tel"),
};
function isFormValid() {
  let notValid = [false, false, false];
  // Check Validation
  // name
  if (inputs.user_name.value.length === 0) {
    inputs.user_name.classList.add("error");
    notValid[0] = true;
    inputs.user_name.previousElementSibling.classList.add("required");
  } else if (
    /\w+/.test(inputs.user_name.value) === false ||
    inputs.user_name.value[0] === " "
  ) {
    inputs.user_name.classList.add("error");
    notValid[0] = true;
    inputs.user_name.previousElementSibling.classList.add("invalid-name");
  }
  // email
  if (inputs.user_email.value.length === 0) {
    inputs.user_email.classList.add("error");
    notValid[1] = true;
    inputs.user_email.previousElementSibling.classList.add("required");
  } else if (
    /\w+\@\w+\.\w+/.test(inputs.user_email.value) === false ||
    inputs.user_email.value[0] === " "
  ) {
    inputs.user_email.classList.add("error");
    notValid[1] = true;
    inputs.user_email.previousElementSibling.classList.add("invalid-email");
  }
  // tel
  if (inputs.user_tel.value.length === 0) {
    inputs.user_tel.classList.add("error");
    notValid[2] = true;
    inputs.user_tel.previousElementSibling.classList.add("required");
  } else if (
    /[^\+\d+]/.test(inputs.user_tel.value) === true ||
    inputs.user_tel.value[0] === " "
  ) {
    inputs.user_tel.classList.add("error");
    notValid[2] = true;
    inputs.user_tel.previousElementSibling.classList.add("invalid-tel");
  }
  // If There Is Any Field Invalid Return (false) Else Return (true)
  let valid = true;
  for (let i = 0; i < notValid.length; i++) {
    if (notValid[i] === true) {
      valid = false;
    }
  }
  return valid;
}

// =============
// Step-2 Events
// =============

//  Plan Choosing
const plans = document.querySelectorAll(".plan");
plans.forEach((plan) => {
  plan.onclick = () => {
    // Remove (choosen) Class From Each Plan
    plans.forEach((p) => {
      p.classList.remove("chosen");
    });
    // Add (chosen) Class To This Plan And Update (formData)
    plan.classList.add("chosen");
    formData.plan = plan.querySelector("h3").innerText.toLocaleLowerCase();
  };
});

// Switcher
const switchBtn = document.getElementById("switch-btn"),
  monthlyText = document.querySelector(".monthly"),
  yearlyText = document.querySelector(".yearly");
switchBtn.onclick = () => {
  if (payType === "monthly") {
    payType = "yearly";
    monthlyText.classList.remove("chosen");
    yearlyText.classList.add("chosen");
  } else {
    payType = "monthly";
    monthlyText.classList.add("chosen");
    yearlyText.classList.remove("chosen");
  }
  changeData(true);
};

// =============
// Step-3 Events
// =============

//  Add-on Choosing
const addOns = document.querySelectorAll(".add-on");
addOns.forEach((addOn) => {
  addOn.onclick = (e) => {
    // Because It's A Label For (checkbox) The Event Target Will Be Checkbox And The Clicked Child ._.
    if (e.target.getAttribute("type") === "checkbox") {
      addOn.classList.toggle("checked");
      // Check If It's Checked After Clicking Or Not Then Change (formData)
      let addOnTitleText = addOn
        .querySelector("h3")
        .innerText.toLocaleLowerCase()
        .replace(" ", "_");
      if (addOn.classList.contains("checked")) {
        formData.add_ons[addOnTitleText] = true;
      } else {
        formData.add_ons[addOnTitleText] = false;
      }
    }
  };
});

// ============
// Slide Events
// ============

const slider = document.getElementById("slider"),
  next = document.getElementById("next"),
  back = document.getElementById("back"),
  stepsOrder = document.querySelectorAll(".order");
let step = 1,
  stepsCount = 5;
// Change Data In Each Step
function changeData(fromSwitcher = false) {
  switch (step) {
    case 2:
      if (!fromSwitcher) {
        // Next-Btn Is Clicked => Save Data
        formData.user.name = inputs.user_name.value;
        formData.user.email = inputs.user_email.value;
        formData.user.tel = inputs.user_tel.value;
      } else {
        // Switch Btn clicked => Change Prices
        plans.forEach((plan) => {
          plan.querySelector(".price").innerText =
            priceData.plans[
              plan.querySelector("h3").innerText.toLocaleLowerCase()
            ][payType][1];
        });
      }
      break;
    case 3:
      // Change Prices
      addOns.forEach((addOn) => {
        addOn.querySelector(".price").innerText =
          priceData.add_ons[
            addOn
              .querySelector("h3")
              .innerText.toLocaleLowerCase()
              .replace(" ", "_")
          ][payType][1];
      });
      break;
    case 4:
      const sum = document.getElementById("sum");
      // Display Plan
      sum.innerHTML = `
              <div class="row">
                <div class="text">
                  <h3>${formData.plan} (${payType})</h3>
                  <span class="low-contrast-text" onclick="step = 1; moveSlider()">Change</span>
                </div>
                <span class="price">${
                  priceData.plans[formData.plan][payType][1]
                }</span>
              </div>

              <hr />
              `;
      let totalPrice = priceData.plans[formData.plan][payType][0];
      // Display Add-Ons
      for (let addOn in formData.add_ons) {
        if (formData.add_ons[addOn]) {
          totalPrice += priceData.add_ons[addOn][payType][0];
          sum.innerHTML += `
              <div class="row">
                <span class="low-contrast-text">${addOn.replace(
                  "_",
                  " "
                )}</span>
                <span class="price">${
                  priceData.add_ons[addOn][payType][1]
                }</span>
              </div>
          `;
        }
      }
      // Display Text If The User Didn't Choose Any Add-On
      if (
        formData.add_ons[Object.keys(formData.add_ons)[0]] === false &&
        formData.add_ons[Object.keys(formData.add_ons)[1]] === false &&
        formData.add_ons[Object.keys(formData.add_ons)[2]] === false
      ) {
        sum.innerHTML += `<div class="row">
        <span class="price">
        A step is submitted, but no selection has been made
        </span>
        </div>`;
      }

      // Display Total
      const total = document.getElementById("total");
      total.innerHTML = `
        <span class="low-contrast-text">Total (per ${
          payType === "monthly" ? "month" : "year"
        })</span>
        <span class="price">$${totalPrice}/${
        payType === "monthly" ? "mo" : "y"
      }</span>
      `;
      break;
  }
}
// Move Slider Depending (Step) Value
function moveSlider() {
  changeData();
  // Move slider
  slider.style.transform = `translateX(-${((step - 1) * 100) / stepsCount}%)`;
  // Show (Back) Button At Step 1
  if (step > 1) {
    back.classList.remove("hidden");
  } else {
    back.classList.add("hidden");
    next.setAttribute("type", "submit");
  }
  // Remove Buttons At Step 5
  if (step >= 5) {
    next.classList.add("hidden");
    back.classList.add("hidden");
  }
  // Add (confirm) Class To (Next) btn In Last Step
  if (step === 4) {
    next.classList.add("confirm");
    next.value = "Confirm";
  } else {
    next.classList.remove("confirm");
    next.value = "Next Step";
  }
  // Make (Step Order) Active
  stepsOrder.forEach((order) => order.classList.remove("active"));
  stepsOrder[step - 1].classList.add("active");
}
moveSlider();
// Next/Back Buttons
next.onclick = function () {
  if (step >= stepsCount) {
    return;
  }
  if (step === 1 && !isFormValid()) {
    console.log(new Error("Form Is Not Valid"));
  } else {
    step++;
    moveSlider();
  }
};
back.onclick = function () {
  if (step <= 1) {
    return;
  }
  step--;
  moveSlider();
};
