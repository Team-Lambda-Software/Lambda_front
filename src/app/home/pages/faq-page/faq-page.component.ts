import { Component, computed, inject, signal } from '@angular/core';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { NgClass, NgStyle } from '@angular/common';
import { Item, ItemFAQ } from './interfaces/faq.models';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [BasicHeaderComponent, NgClass, NgStyle, TranslocoModule],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.css'
})
export class FaqPageComponent {

  private items = signal<ItemFAQ[]>([
    {
      category: 'Prenatal',
      items: [
        { label: 'Is yoga safe during pregnancy?', content: 'Yoga can be safe during pregnancy when practiced under the guidance of a qualified instructor and with modifications to accommodate the changing needs of the body.', expanded: false },
        { label: 'What are the benefits of prenatal yoga?', content: 'Prenatal yoga can help improve flexibility, strength, and endurance, alleviate common discomforts such as back pain and swelling, and promote relaxation and stress relief during pregnancy.', expanded: false },
        { label: 'Are there any specific poses to avoid during pregnancy?', content: 'Certain poses, such as deep twists, strong backbends, and poses that require lying flat on the back for extended periods, should be avoided during pregnancy to ensure the safety of both mother and baby.', expanded: false },
        { label: 'How can yoga help prepare for childbirth?', content: 'Yoga can help prepare for childbirth by teaching breathing techniques for pain management, promoting pelvic floor strength and flexibility, and fostering a sense of mental and emotional readiness for labor and delivery.', expanded: false }
      ]
    },
    {
      category: 'Confidence',
      items: [
        { label: 'What are the benefits of practicing yoga in the morning?', content: 'Practicing yoga in the morning can help awaken your body and mind, improve flexibility and focus for the day ahead, and establish a positive mindset.', expanded: false },
        { label: 'How can yoga improve posture?', content: 'Yoga can improve posture by strengthening the core muscles, increasing body awareness, and promoting proper alignment through various poses and stretches.', expanded: false },
        { label: 'What are some yoga poses for relieving back pain?', content: 'Yoga poses such as Cat-Cow, Child\'s Pose, and Cobra Pose can help alleviate back pain by stretching and strengthening the back muscles, improving spinal flexibility, and reducing tension.', expanded: false },
        { label: 'Can yoga help with insomnia?', content: 'Yes, yoga can help with insomnia by promoting relaxation, reducing stress and anxiety levels, and incorporating calming breathing exercises and gentle stretches before bedtime.', expanded: false }
      ]
    },
    {
      category: 'Amount',
      items: [
        { label: 'What are some basic yoga poses for beginners?', content: 'Some basic yoga poses for beginners include Mountain Pose, Downward-Facing Dog, Child\'s Pose, and Warrior I.', expanded: false },
        { label: 'How does yoga help with stress relief?', content: 'Yoga helps with stress relief by promoting relaxation, reducing cortisol levels, and encouraging mindfulness through breathing and meditation techniques.', expanded: false },
        { label: 'What are the benefits of practicing yoga regularly?', content: 'Regular yoga practice can improve flexibility, strength, posture, and balance. It can also enhance mental clarity, reduce stress, and promote overall well-being.', expanded: false },
        { label: 'What is the difference between Hatha and Vinyasa yoga?', content: 'Hatha yoga focuses on static poses and breath control, while Vinyasa yoga involves flowing sequences of poses coordinated with breath.', expanded: false }
      ]
    },
    {
      category: 'FAQ',
      items: [
        { label: 'What are the benefits of practicing yoga in the evening?', content: 'Practicing yoga in the evening can help relax the body and mind, relieve tension from the day, improve sleep quality, and promote a sense of calmness and well-being.', expanded: false },
        { label: 'How does yoga benefit mental health?', content: 'Yoga benefits mental health by reducing stress, anxiety, and depression symptoms, promoting mindfulness and self-awareness, and improving overall emotional well-being.', expanded: false },
        { label: 'Are there specific yoga poses for stress relief?', content: 'Yes, there are specific yoga poses such as Child\'s Pose, Forward Fold, and Legs-Up-the-Wall Pose that can help reduce stress, calm the nervous system, and promote relaxation.', expanded: false },
        { label: 'Can yoga help with digestion?', content: 'Yes, certain yoga poses and breathing techniques can aid digestion by stimulating the digestive organs, reducing bloating and gas, and promoting healthy bowel movements.', expanded: false },
        { label: 'What are the benefits of a regular yoga practice?', content: 'A regular yoga practice can improve flexibility, strength, and balance, reduce the risk of injury, enhance body awareness, and promote overall physical and mental well-being.', expanded: false },
        { label: 'Is it safe to practice yoga during menstruation?', content: 'Yes, it is generally safe to practice yoga during menstruation, but certain poses should be avoided or modified to accommodate the body\'s needs and comfort level during this time.', expanded: false }
      ]
      
    },
    {
      category: 'A large category',
      items: [
        { label: 'What are the benefits of yoga for seniors?', content: 'Yoga for seniors can improve flexibility, balance, and joint health, reduce the risk of falls, alleviate arthritis symptoms, and promote relaxation and stress relief.', expanded: false },
        { label: 'Can yoga help with chronic pain management?', content: 'Yes, yoga can be an effective tool for managing chronic pain by reducing inflammation, improving mobility, and enhancing overall physical and mental well-being through gentle movement and mindfulness practices.', expanded: false }
      ]
    }
  ]);
  public darkModeService = inject(DarkModeService);
  public categories = computed(() => {
    return this.items().map(item => item.category);
  });
  public categorySelected = signal(this.categories().at(0)!);
  public realItems = computed( () => {
    return this.items().filter( item => item.category === this.categorySelected())[0]
  })
  
  toggleAccordion(item: Item) {
    item.expanded = !item.expanded;
  }

  seeAll() {
    const allItems: Item[] = this.items().map(item => item.items).flat();
    const updatedItems: ItemFAQ[] = [{ category: 'All', items: allItems }, ...this.items()];
    this.items.set(updatedItems);
    this.categorySelected.set('All');
  }

  setCategory(category: string) {
    if (this.categorySelected() === 'All' && category !== 'All') 
      this.items.set([...this.items().filter( i => i.category !== 'All')])
    
    this.categorySelected.set(category);
  }


}
