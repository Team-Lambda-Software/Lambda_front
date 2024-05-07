import { trigger, style, animate, transition } from '@angular/animations';

export const simpleAnimation = trigger('simpleAnimation', [
  transition('false => true, true => false', [
    style({ 
      transform: 'translateX(100%)',
      opacity: 0 
    }),
    animate('.5s ease-out', style({ 
      transform: 'translateX(0)',
      opacity: 1
    }))
  ])
]);
