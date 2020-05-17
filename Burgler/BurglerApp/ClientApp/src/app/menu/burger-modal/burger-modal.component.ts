import { Component, OnInit, Input } from "@angular/core";
import { Ingredients } from "../ingredients";
import { BurgerItem, Menu } from "../menu";
import { OrderService } from "src/app/orders/order.service";
import { Order, BurgerItemJson } from "src/app/orders/order";
import { MenuService } from "../menu.service";

@Component({
  selector: "app-burger-modal",
  templateUrl: "./burger-modal.component.html",
  styleUrls: ["./burger-modal.component.css"],
})
export class BurgerModalComponent implements OnInit {
  @Input() burger: BurgerItem;
  customBurgerOrder: BurgerItemJson;
  option: { size: string; calories: number; price: number };
  order: Order;
  menu: Menu;
  ingredients: Ingredients;

  constructor(
    private menuService: MenuService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.order = this.orderService.getPendingOrder();
    this.menu = this.menuService.getMenu();
    this.ingredients = this.menuService.getIngredients();
  }

  addBurgerToOrder(name: string, size: string) {
    this.orderService
      .addToPendingOrder(this.burger, "burgers", size)
      .subscribe();
  }

  customiseBurger(option: { size: string; calories: number; price: number }) {
    this.customBurgerOrder = new BurgerItemJson(this.burger, option);
    this.option = option;
  }

  checkIfIngredientIsIncluded(listOfIngredients: string[], ing: string) {
    return !!listOfIngredients.find((i) => i === ing);
  }

  chooseIng(ing: string, type: string) {
    console.log(this.burger);
    console.log(this.customBurgerOrder);
    if (type === "burgerBun") {
      this.customBurgerOrder.burgerBun = ing;
    } else if (type === "burgerToppings") {
      this.customBurgerOrder.addOrRemoveTopping(ing);
    } else if (type === "burgerPatty") {
      this.customBurgerOrder.burgerPatty = ing;
    } else if (type === "burgerPattyCooked") {
      this.customBurgerOrder.burgerPattyCooked = +ing;
    }
    console.log(this.customBurgerOrder);
  }

  addToOrder() {
    this.orderService
      .addCustomBurgerToPendingOrder(this.customBurgerOrder)
      .subscribe((res) => {
        console.log(this.orderService.getPendingOrder());
      });
  }
}