<?php

namespace App\Controller;

use App\Entity\Lesson;
use App\Entity\UserLesson;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;

final class SignPresenceController extends AbstractController {

    public function __invoke(int $id, EntityManagerInterface $em, Security $security): JsonResponse
    {
        $user = $security->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Unauthorized'], 401);
        }
    
        $lesson = $em->getRepository(Lesson::class)->find($id);
        if (!$lesson) {
            return new JsonResponse(['message' => 'Leçon introuvable'], 404);
        }
    
        $userLessonRepo = $em->getRepository(UserLesson::class);
        $existing = $userLessonRepo->findOneBy(['user' => $user, 'lesson' => $lesson]);
        if ($existing) {
            return new JsonResponse(['message' => 'Déjà enregistré']);
        }
    
        $userLesson = new UserLesson();
        $userLesson->setUser($user);
        $userLesson->setLesson($lesson);
    
        $em->persist($userLesson);
        $em->flush();
    
        return new JsonResponse(['message' => 'Présence enregistrée']);
    }
}